import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Product, ProductId, Coin } from 'src/models';

import * as vendingActions from './vending.actions';
import { initialProducts } from 'src/assets/products';
import { attemptChange } from 'src/app/core/attempt-change';
import { getChangeMessage } from 'src/app/core/get-change-message';
import { sumChange } from 'src/app/core/sum-change';
import { produce } from 'immer';
import { addRecord } from './helpers/add-record';
import { reloadableCoins } from 'src/assets/reloadable-coins';
import { Option, none, fold, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export interface VendingStateModel {
    products: Record<ProductId, Product>;
    change: Coin[];
    credit: number;
    messages: string[];
    moneyBox: Coin[];
    productBox: Product[];
    lastAttemptedVend: Option<ProductId>;
}

export const initialState: VendingStateModel = {
    products: initialProducts,
    change: reloadableCoins,
    credit: 0,
    messages: ['Please insert coins and choose a product'],
    moneyBox: [],
    productBox: [],
    lastAttemptedVend: none,
};

@State<VendingStateModel>({
    name: 'vending',
    defaults: initialState,
})
@Injectable()
export class VendingState {
    @Selector() static products(state: VendingStateModel) {
        return state.products;
    }
    @Selector() static messages(state: VendingStateModel) {
        return state.messages;
    }
    @Selector() static credit(state: VendingStateModel) {
        return state.credit;
    }
    @Selector() static moneyBox(state: VendingStateModel) {
        return state.moneyBox;
    }
    @Selector() static productBox(state: VendingStateModel) {
        return state.productBox;
    }

    @Action(vendingActions.ProductSelected) productSelected(
        { getState, dispatch }: StateContext<VendingStateModel>,
        { productId }: vendingActions.ProductSelected
    ) {
        const { credit, products, change, productBox, moneyBox } = getState();

        if (credit >= products[productId].price) {
            dispatch(
                new vendingActions.VendProductSuccess(
                    productId,
                    { ...products },
                    credit,
                    [...change],
                    productBox,
                    moneyBox
                )
            );
        } else {
            dispatch(
                new vendingActions.VendProductFailure(productId, credit, {
                    ...products,
                })
            );
        }
    }

    @Action(vendingActions.VendProductSuccess) vendProductSuccess(
        { patchState }: StateContext<VendingStateModel>,
        {
            productId,
            products,
            credit,
            change,
            productBox,
            moneyBox,
        }: vendingActions.VendProductSuccess
    ) {
        const remainingCredit = credit - products[productId].price;

        const attemptedChange = attemptChange(change, remainingCredit);

        const changeMessage = getChangeMessage(
            attemptedChange,
            remainingCredit
        );

        const finalCredit =
            remainingCredit - sumChange(attemptedChange.changeCoins);

        const vendingMessage = 'Please take your item';

        const productToVend = { ...products[productId] };

        delete products[productId];

        patchState({
            messages: [vendingMessage, changeMessage],
            credit: finalCredit,
            products,
            moneyBox: [...moneyBox, ...attemptedChange.changeCoins],
            productBox: [...productBox, productToVend],
            change: attemptedChange.remainingCoins,
            lastAttemptedVend: none,
        });
    }

    @Action(vendingActions.VendProductFailure)
    vendProductFailure(
        { patchState }: StateContext<VendingStateModel>,
        { productId, credit, products }: vendingActions.VendProductFailure
    ) {
        const missingAmount = products[productId].price - credit;
        const message = `Insufficient Funds. You need to enter at least £${(
            missingAmount / 100
        ).toFixed(2)}`;

        patchState({
            messages: [message],
            lastAttemptedVend: some(productId),
        });
    }

    @Action(vendingActions.CoinInserted)
    coinInserted(
        { getState, patchState, dispatch }: StateContext<VendingStateModel>,
        { coin }: vendingActions.CoinInserted
    ) {
        const { change, credit, lastAttemptedVend } = getState();
        const newChange = [...change, coin];
        const newCredit = credit + coin.value;
        pipe(
            lastAttemptedVend,
            fold(
                () => {},
                (id) => dispatch(new vendingActions.ProductSelected(id))
            )
        );
        patchState({
            change: newChange,
            credit: newCredit,
        });
    }

    @Action(vendingActions.ReloadCoins) reloadCoins(
        { getState, patchState }: StateContext<VendingStateModel>,
        { coins }: vendingActions.ReloadCoins
    ) {
        const { change } = getState();
        patchState({
            change: [...change, ...coins],
        });
    }

    @Action(vendingActions.ReloadProducts) reloadProducts(
        { getState, patchState }: StateContext<VendingStateModel>,
        { products }: vendingActions.ReloadProducts
    ) {
        const { products: currentProducts } = getState();
        const newProducts = produce(currentProducts, (draft) => {
            products.forEach((p) => addRecord(draft, p));
        });

        patchState({
            products: newProducts,
        });
    }

    @Action(vendingActions.ProductsTaken) productsTaken({
        patchState,
    }: StateContext<VendingStateModel>) {
        patchState({
            productBox: [],
        });
    }

    @Action(vendingActions.ChangeTaken) changeTaken({
        patchState,
    }: StateContext<VendingStateModel>) {
        patchState({
            moneyBox: [],
        });
    }
}
