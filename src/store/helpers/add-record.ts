/**
 * Add a value to a record, generating and returning an Id.
 */
export const addRecord = <T>(obj: Record<number, T>, val: T) => {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        obj[0] = val;
        return 0;
    } else {
        const maxIndex = Math.max(...keys.map(Number));
        obj[maxIndex + 1] = val;
        return maxIndex + 1;
    }
};
