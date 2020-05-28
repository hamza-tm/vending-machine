import { Either, left } from 'fp-ts/lib/Either';
import { Coin } from 'src/models';

export const attemptChange = (
    coins: Array<Coin>,
    amount: number
): Either<string, Array<Coin>> => {
    return left('not implemented');
};
