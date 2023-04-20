import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://nc-games-api-9f6b.onrender.com/api',
});

export function fetchAllReviews() {
  return gamesApi.get('/reviews').then(({ data }) => data.reviews);
}
