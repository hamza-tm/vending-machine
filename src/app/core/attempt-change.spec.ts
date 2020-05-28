import theoretically from 'jest-theories';
import { right, fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { identity } from 'fp-ts/lib/function';
import { attemptChange } from './attempt-change';

describe('attemptChange', () => {
    const theories = [
        {
            coins: [{ value: 10 }, { value: 20 }, { value: 50 }],
            amount: 40,
            expected: right([{ value: 20 }, { value: 10 }]),
        },
        {
            coins: [{ value: 100 }, { value: 50 }, { value: 50 }],
            amount: 100,
            expected: right([{ value: 100 }]),
        },
    ];

    theoretically(
        ({ coins, amount, expected }) =>
            `should return (${pipe(
                expected,
                fold(identity, (cs) => cs.toString())
            )}) when given coins ${coins} and asked to change ${amount}`,
        theories,
        (theory) => {
            const actual = attemptChange(theory.coins, theory.amount);
            expect(actual).toEqual(theory.expected);
        }
    );
    it('should return ', () => {});
});
