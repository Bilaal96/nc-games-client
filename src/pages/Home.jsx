import { useEffect, useState } from 'react';
import * as gamesApi from '../api';

// Components
import { Grid } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import PreviewCard from '../components/PreviewCard';

// Render Previews of Reviews
const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    gamesApi
      .fetchReviews()
      .then((reviewsData) => {
        console.log(reviewsData);
        setReviews(reviewsData);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage =
          err.response.data.message ||
          'Something went wrong. Please try again later.';
        setError(errorMessage);
        setIsLoading(false);
      });
  }, []);

  if (error)
    return (
      <PageWrapper heading="Reviews">
        <DisplayMessage
          error={error}
          message="Something went wrong whilst fetching the reviews. Please try again later."
        />
      </PageWrapper>
    );

  if (isLoading)
    return (
      <PageWrapper heading="Reviews">
        <PageSpinner />
      </PageWrapper>
    );

  return (
    <PageWrapper heading="Reviews">
      {reviews.length ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ px: { xs: 4, md: 2, lg: 0 } }}
        >
          {reviews.map((review) => (
            <Grid key={review.review_id} item xs={12} sm={6} md={4} lg={3}>
              <PreviewCard {...review} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <DisplayMessage message="No reviews found" />
      )}
    </PageWrapper>
  );
};

export default Home;
