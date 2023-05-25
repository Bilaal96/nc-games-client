import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as gamesApi from '../api';

// Components
import PageWrapper from '../components/PageWrapper';
import PageSpinner from '../components/PageSpinner';
import DisplayMessage from '../components/DisplayMessage';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import StyledChip from '../components/StyledChip';

// Utils
import getDateStringFromTimestamp from '../utils/get-date-string-from-timestamp';
import ReviewComments from '../components/ReviewComments';
import ReviewInteractionsBar from '../components/ReviewInteractionsBar';

const ReviewSection = ({ children }) => {
  return (
    <Grid item xs={12}>
      <Paper component="section" elevation={2} sx={{ p: 2 }}>
        {children}
      </Paper>
    </Grid>
  );
};

const Review = () => {
  const { review_id } = useParams();
  const {
    isLoading: loadingReview,
    error: errorReview,
    data: review,
  } = useQuery(['reviews', review_id], gamesApi.fetchReviewById);

  // Dependent query - only executes if enabled property evaluates to true - i.e. review was fetched successfully
  const {
    isLoading: loadingComments,
    error: errorComments,
    data: comments,
  } = useQuery(['comments', review_id], gamesApi.fetchCommentsByReviewId, {
    enabled: !!review,
  });

  if (loadingReview || loadingComments) {
    return (
      <PageWrapper heading="Review">
        <PageSpinner />
      </PageWrapper>
    );
  }

  const error = errorReview || errorComments;
  if (error) {
    return (
      <PageWrapper heading="Review">
        <DisplayMessage
          error={error.message}
          message={`Something went wrong whilst fetching data for review with ID: ${review_id}. Please try again later.`}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper heading="Review">
      <Grid container spacing={2}>
        <ReviewSection>
          <Stack spacing={2}>
            <Typography
              color="primary"
              component="h2"
              sx={{
                typography: {
                  xs: 'h5',
                  md: 'h4',
                },
              }}
            >
              {review.title}
            </Typography>

            <StyledChip
              label={review.category}
              variant="outlined"
              sx={{ width: 'max-content' }}
            />

            {/* Metadata */}
            <Grid container px={1} rowGap={1}>
              <Grid item xs={12} sm={6} md={8}>
                {/* Image */}
                <img
                  width="100%"
                  src={review.review_img_url}
                  alt={review.title}
                />
              </Grid>
              {/* Text */}
              <Grid item xs={12} sm={6} md={4} alignSelf="center">
                <Stack spacing={1} pl={{ sm: 3, md: 6 }}>
                  <Typography>
                    <strong>Designer:</strong> {review.designer}
                  </Typography>
                  <Typography>
                    <strong>Review by:</strong> {review.owner}
                  </Typography>
                  <Typography sx={{ color: 'grey' }}>
                    <em>{getDateStringFromTimestamp(review.created_at)}</em>
                  </Typography>
                </Stack>
              </Grid>

              {/* Review Article */}
              <Grid item md={8}>
                <Typography>{review.review_body}</Typography>
              </Grid>

              {/* Interaction Bar - like & dislike */}
              <Grid item xs={12} md={8}>
                <ReviewInteractionsBar
                  reviewId={review_id}
                  votes={review.votes}
                />
              </Grid>
            </Grid>
          </Stack>
        </ReviewSection>

        {/* Comments section */}
        <ReviewSection>
          <ReviewComments comments={comments} />
        </ReviewSection>
      </Grid>
    </PageWrapper>
  );
};

export default Review;
