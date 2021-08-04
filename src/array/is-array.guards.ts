// Keep this mutable to compatibility with io-ts
// eslint-disable-next-line functional/prefer-readonly-type
export const isArray = (el: unknown): el is unknown[] => Array.isArray(el);
