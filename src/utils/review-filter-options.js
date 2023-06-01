const filterByCategory = [
  'strategy',
  'hidden-roles',
  'dexterity',
  'push-your-luck',
  'roll-and-write',
  'deck-building',
  'engine-building',
];

const sortByProperty = [
  'title',
  'category',
  'votes',
  'designer', // game designer
  'owner', // author of review
  'created_at',
];

const orderBy = ['asc', 'desc'];

// Adds empty string as first value of an array
function unshiftEmptyString(array) {
  const newArray = [...array];
  newArray.unshift('');
  return newArray;
}

/**
 * NOTE: In order prevent false errors, the fetchAllReviews API request requires arrays with empty string as 1st element
 * e.g. when URLSearchParams contains either category= / sortBy= / order=, the request is processed as if they're not specified
 */
export const validReviewFilters = {
  category: unshiftEmptyString(filterByCategory),
  sort_by: unshiftEmptyString(sortByProperty),
  order: unshiftEmptyString(orderBy),
};

// ReviewFilters' selectOptions prop expects an object containing arrays, where array elements are in the format: { value: ... }
const formatSelectMenuItems = (value) => ({ value });

export const categoryFilterOptions = filterByCategory.map(
  formatSelectMenuItems
);
export const sortByFilterOptions = sortByProperty.map(formatSelectMenuItems);
export const orderFilterOptions = orderBy.map(formatSelectMenuItems);
