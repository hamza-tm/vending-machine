import { ProductId, Product } from 'src/models';

export const initialProducts: Record<ProductId, Product> = {
    [0]: {
        name: 'coke',
        price: 170,
    },
    [1]: {
        name: 'pepsi',
        price: 120,
    },
    [2]: {
        name: 'sevenup',
        price: 180,
    },
    [3]: {
        name: 'pepsi',
        price: 120,
    },
};
