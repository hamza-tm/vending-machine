import { Coin } from 'src/models';

export const sumChange = (coins: Array<Coin>): number =>
    coins.reduce((acc, cur) => (acc += cur.value), 0);

