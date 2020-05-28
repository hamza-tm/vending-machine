import { AttemptedChange } from './attempt-change';
import { sumChange } from './sum-change';

export const getChangeMessage = (
    attemptedChange: AttemptedChange,
    remainingCredit: number
): string =>
    remainingCredit > 0
        ? sumChange(attemptedChange.changeCoins) < remainingCredit
            ? "Insufficient Change! I don't have enough coins"
            : 'Please take your change'
        : 'No change required';

