import theoretically from 'jest-theories';
import { attemptChange } from './attempt-change';

describe('attemptChange', () => {
    const theories = [
        {
            coins: [{ value: 20 }, { value: 10 }, { value: 50 }],
            amount: 40,
            expected: {
                changeCoins: [{ value: 20 }, { value: 10 }],
                remainingCoins: [{ value: 50 }],
            },
        },
        {
            coins: [{ value: 100 }, { value: 50 }, { value: 50 }],
            amount: 100,
            expected: {
                changeCoins: [{ value: 100 }],
                remainingCoins: [{ value: 50 }, { value: 50 }],
            },
        },
        {
            coins: [{ value: 100 }, { value: 50 }, { value: 50 }],
            amount: 10,
            expected: {
                changeCoins: [],
                remainingCoins: [{ value: 100 }, { value: 50 }, { value: 50 }],
            },
        },
        {
            coins: [{ value: 100 }, { value: 50 }, { value: 50 }],
            amount: 1000,
            expected: {
                changeCoins: [{ value: 100 }, { value: 50 }, { value: 50 }],
                remainingCoins: [],
            },
        },
    ];

    theoretically(
        ({ coins, amount, expected }) =>
            `should return (${expected}) when given coins ${coins} and asked to change ${amount}`,
        theories,
        (theory) => {
            const actual = attemptChange(theory.coins, theory.amount);
            expect(actual).toEqual(theory.expected);
        }
    );
});
