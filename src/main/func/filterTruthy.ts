export const filterTruthy = (record: object) =>
    Object.fromEntries(Object.entries(record).filter(([_, value]) => !!value))