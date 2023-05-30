import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://nc-games-api-9f6b.onrender.com/api',
});

export function fetchAllUsers() {
  return gamesApi.get('/users').then(({ data }) => data.users);
}

export function fetchAllReviews(queryString) {
  // TODO validate query string on client side - prevents unnecessary request
  const requestUrl = queryString ? `/reviews?${queryString}` : 'reviews';
  console.log({ requestUrl });

  return gamesApi.get(requestUrl).then(({ data }) => data.reviews);
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
