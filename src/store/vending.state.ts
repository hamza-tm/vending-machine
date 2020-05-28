import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Product, ProductId, Coin } from 'src/models';

import { Option, none } from 'fp-ts/lib/Option';
import * as vendingActions from './vending.actions';
import { initialProducts } from 'src/assets/products';
import { sumChange } from 'src/app/core/change';

export interface VendingStateModel {
    products: Record<ProductId, Product>;
    change: Coin[];
    credit: number;
    message: Option<string>;
    moneyBox: Coin[];
    productBox: Product[];
}

export const initialState: VendingStateModel = {
    products: initialProducts,
    change: [],
    credit: 0,
    message: none,
    moneyBox: [],
    productBox: [],
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
    @Selector() static message(state: VendingStateModel) {
        return state.message;
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
        const { credit, products } = getState();

        if (credit > products[productId].price) {
            dispatch(new vendingActions.VendProductSuccess(productId));
        } else {
            dispatch(new vendingActions.VendProductFailure(productId));
        }
    }

    @Action(vendingActions.VendProductSuccess) vendProductSuccess(
        { getState, patchState }: StateContext<VendingStateModel>,
        { productId }: vendingActions.VendProductSuccess
    ) {
        const { products, credit, coins } = getState();

        const newProducts = { ...products };
        delete newProducts[productId];

        const newCredit = credit - products[productId].price;
    }

    @Action(vendingActions.CoinInserted)
    coinInserted(
        { getState, patchState }: StateContext<VendingStateModel>,
        { coin }: vendingActions.CoinInserted
    ) {
        const { change, credit } = getState();
        const newChange = [...change, coin];
        const newCredit = credit + coin.value;
        patchState({
            change: newChange,
            credit: newCredit,
        });
    }
}
