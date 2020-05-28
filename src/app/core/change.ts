import { Coin } from 'src/models';
import { Either } from 'fp-ts/lib/Either'

export const sumChange = (coins: Array<Coin>): number =>
    coins.reduce((acc, cur) => (acc += cur.value), 0);

export const attemptChange = (coins: Array<Coin>, amount: number): Either<string, Array<Coin>> => 
