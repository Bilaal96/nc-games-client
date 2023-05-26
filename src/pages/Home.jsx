import { useQuery } from '@tanstack/react-query';
import * as gamesApi from '../api';

// Components
import { Grid } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import PreviewCard from '../components/PreviewCard';

// Render Previews of Reviews
const Home = () => {
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({ queryKey: ['reviews'], queryFn: gamesApi.fetchAllReviews });

  if (isLoading) {
    return (
      <PageWrapper heading="Reviews">
        <PageSpinner />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper heading="Reviews">
        <DisplayMessage
          error={error.message}
          message="Something went wrong whilst fetching the reviews. Please try again later."
        />
      </PageWrapper>
    );
  }

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
