import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product, ProductId, Identifiable, Coin } from 'src/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VendingState } from 'src/store/vending.state';
import {
    ProductSelected,
    CoinInserted,
    ReloadCoins,
    ReloadProducts,
} from 'src/store/vending.actions';

export function recordToIdentifiableArray<T>(
    r: Record<number, T>
): Array<Identifiable & T> {
    return Object.entries(r).map(([idStr, item]) => ({
        id: Number(idStr),
        ...item,
    }));
}

export function sortProductsByName(array: Array<Identifiable & Product>) {
    return array.sort((l, r) => l.name.localeCompare(r.name));
}

@Injectable({
    providedIn: 'root',
})
export class VendingFacadeService {
    @Select(VendingState.products) products$: Observable<
        Record<ProductId, Product>
    >;

    @Select(VendingState.credit) credit$: Observable<number>;

    @Select(VendingState.messages) messages$: Observable<string[]>;

    @Select(VendingState.moneyBox) moneyBox$: Observable<Coin[]>;

    @Select(VendingState.productBox) productBox$: Observable<Product[]>;

    public identifiableProducts$: Observable<Array<Product & Identifiable>>;

    constructor(private store: Store) {
        this.identifiableProducts$ = this.products$.pipe(
            map(recordToIdentifiableArray),
            map(sortProductsByName)
        );
    }

    public productSelected(productId: ProductId) {
        this.store.dispatch(new ProductSelected(productId));
    }

    public coinInserted(value: number) {
        this.store.dispatch(new CoinInserted({ value }));
    }

    public reloadCoins(coins: Coin[]) {
        this.store.dispatch(new ReloadCoins(coins));
    }

    public reloadProducts(products: Product[]) {
        this.store.dispatch(new ReloadProducts(products));
    }
}
