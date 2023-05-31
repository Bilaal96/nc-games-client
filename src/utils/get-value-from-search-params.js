/**
 * @returns `value` corresponding to the given `key` via `URLSearchParams` API
 */
function getValueFromSearchParams(key) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has(key) ? searchParams.get(key) : '';
}

export default getValueFromSearchParams;
