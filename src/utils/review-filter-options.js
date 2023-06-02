import { formatBasicSelectOptions } from './basic-select-options';

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
 * `fetchAllReviews` (an API request function, see @module /src/api.js) requires `validReviewFilters` to prevent false errors.
 
 * Without `validReviewFilters`, false errors occur when `URLSearchParams` contains either `category=` / `sortBy=` / `order=` - i.e where value equates to an empty string.

 * In order to prevent this, we must specify an empty string as a valid query value.
 * This is accomplished by calling `unshiftEmptyString(filtersArray)` - the filtersArray's are defined above.
 */
export const validReviewFilters = {
  category: unshiftEmptyString(filterByCategory),
  sort_by: unshiftEmptyString(sortByProperty),
  order: orderBy,
};

// These `filterOptions` arrays are passed to ReviewFiltersSelect's option prop
export const categoryFilterOptions = filterByCategory.map(
  formatBasicSelectOptions
);
export const sortByFilterOptions = sortByProperty.map(formatBasicSelectOptions);
export const orderFilterOptions = orderBy.map(formatBasicSelectOptions);
