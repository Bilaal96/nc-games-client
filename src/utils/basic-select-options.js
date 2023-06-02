/**
 * `BasicSelect` accepts an `options` prop.
 * options accepts an array of `option` objects, each containing:
  - a required `value` property
  - an optional `text` property

 * if `options.text` is `undefined`, `options.value` is used in its place.

 * As `ReviewFiltersSelect` is a wrapper around `BasicSelect`, it also takes an `options` prop that accepts an array of the same structure.
 */
export const formatBasicSelectOptions = (value) => {
  const charsToRemoveRegex = /[-_]/g;
  return {
    text: charsToRemoveRegex.test(value)
      ? value.replaceAll(charsToRemoveRegex, ' ')
      : undefined,
    value,
  };
};
