import { Product, ProductId, Coin } from 'src/models';

/* Events */

export class ProductSelected {
    static readonly type = '[Vending] Product Selected';
    constructor(public productId: ProductId) {}
}

export class CoinInserted {
    static readonly type = '[Vending] Coin Inserted';
    constructor(public coin: Coin) {}
}

/* Commands */

export class ReloadProducts {
    static readonly type = '[Vending] Reload Products';
    constructor(public products: Product[]) {}
}

export class ReloadCoins {
    static readonly type = '[Vending] Reload Coins';
    constructor(public coins: Coin[]) {}
}

export class VendProductSuccess {
    static readonly type = '[Vending] Vend Product Success';
    constructor(
        public productId: number,
        public products: Record<ProductId, Product>,
        public credit: number,
        public change: Coin[],
        public productBox: Product[],
        public moneyBox: Coin[]
    ) {}
}

export class VendProductFailure {
    static readonly type = '[Vending] Vend Product Failure';
    constructor(
        public productId: number,
        public credit: number,
        public products: Record<ProductId, Product>
    ) {}
}
