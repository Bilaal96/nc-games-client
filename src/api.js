import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://nc-games-api-9f6b.onrender.com/api',
});

export function fetchAllReviews() {
  return gamesApi.get('/reviews').then(({ data }) => data.reviews);
}

export function fetchReviewById({ queryKey }) {
  const review_id = queryKey[1];
  return gamesApi.get(`/reviews/${review_id}`).then(({ data }) => data.review);
}

export function fetchCommentsByReviewId({ queryKey }) {
  const review_id = queryKey[1];
  return gamesApi
    .get(`/reviews/${review_id}/comments`)
    .then(({ data }) => data.comments);
}
