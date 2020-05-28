import { ProductId, Product } from 'src/models';

export const initialProducts: Record<ProductId, Product> = {
    [0]: {
        name: 'Coke',
        price: 170,
    },
    [1]: {
        name: 'Pepsi',
        price: 120,
    },
    [2]: {
        name: 'Sevenup',
        price: 180,
    },
    [3]: {
        name: 'Pepsi',
        price: 120,
    },
};
