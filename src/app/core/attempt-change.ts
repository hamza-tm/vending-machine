import { Coin } from 'src/models';
import { pipe } from 'fp-ts/lib/pipeable';
import { sumChange } from './sum-change';

export type AttemptedChange = { changeCoins: Coin[]; remainingCoins: Coin[] };

const sortByMostValuable = (coins: Array<Coin>): Array<Coin> =>
    coins.sort((l, r) => r.value - l.value);

/* Partitions a set of coins into a change pot and a remaining pot */
export const attemptChange = (
    coins: Array<Coin>,
    amount: number
): AttemptedChange =>
    pipe(coins, sortByMostValuable, (coins) =>
        coins.reduce<AttemptedChange>(
            (acc, cur) => {
                sumChange(acc.changeCoins) + cur.value > amount
                    ? acc.remainingCoins.push(cur)
                    : acc.changeCoins.push(cur);
                return acc;
            },
            {
                changeCoins: [],
                remainingCoins: [],
            }
        )
    );
