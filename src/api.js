import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://nc-games-api-9f6b.onrender.com/api',
});

export function fetchAllUsers() {
  return gamesApi.get('/users').then(({ data }) => data.users);
}

export function fetchAllReviews(searchParams) {
  // Validate searchParams to prevent requests that will definitely fail
  // Returned error states can be used to give feedback to user
  if (searchParams) {
    const validFilters = {
      category: [
        'strategy',
        'hidden-roles',
        'dexterity',
        'push-your-luck',
        'roll-and-write',
        'deck-building',
        'engine-building',
        // If no explicit 'category' query is specified, backend will fetch reviews from all categories
        '',
      ],
      sort_by: [
        'title', // game title
        'category',
        'votes', // review votes
        'designer', // game designer
        'owner', // author of review
        'created_at',
        // If no explicit 'sort_by' query is specified, backend defaults to 'created_at'
        '',
      ],
      // If 'sort_by' query is explicitly set, 'order' defaults to 'asc'
      // Otherwise, backend defaults to 'sort_by=created_at' & 'order=desc'
      // Explicitly specifying 'order' will override the defaults
      order: ['asc', 'desc', ''],
    };

    const hasInvalidParamValue = (key) => {
      return (
        searchParams.has(key) &&
        !validFilters[key].includes(searchParams.get(key))
      );
    };

    let errors = { category: false, sort_by: false, order: false };

    if (hasInvalidParamValue('category')) errors.category = true;
    if (hasInvalidParamValue('sort_by')) errors.sort_by = true;
    if (hasInvalidParamValue('order')) errors.order = true;

    // If any errors, reject
    if (Object.values(errors).includes(true)) {
      return Promise.reject({ message: 'invalid review filter', ...errors });
    }
  }

  // No errors, make request
  return gamesApi
    .get('/reviews', { params: searchParams })
    .then(({ data }) => data.reviews);
}

export function fetchReviewCategories() {
  return gamesApi.get('/categories').then(({ data }) => data.categories);
}

export function fetchReviewById({ queryKey }) {
  const review_id = queryKey[1];
  return gamesApi.get(`/reviews/${review_id}`).then(({ data }) => data.review);
}

export function patchReviewVotes({ review_id, inc_votes }) {
  return gamesApi
    .patch(`/reviews/${review_id}`, { inc_votes })
    .then(({ data }) => data.updatedReview);
}

export function fetchAllReviewComments({ queryKey }) {
  const review_id = queryKey[1];
  return gamesApi
    .get(`/reviews/${review_id}/comments`)
    .then(({ data }) => data.comments);
}

export function postReviewComment({ review_id, newComment }) {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, newComment)
    .then(({ data }) => data.createdComment);
}

export function deleteReviewComment({ comment_id }) {
  return gamesApi.delete(`/comments/${comment_id}`);
}
