import { useQuery } from 'react-query';
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

const Review = () => {
  const { review_id } = useParams();
  const {
    isFetching,
    error,
    data: review,
  } = useQuery('review', () => gamesApi.fetchReviewById(review_id));

  if (isFetching) {
    return (
      <PageWrapper heading="Review">
        <PageSpinner />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper heading="Review">
        <DisplayMessage
          error={error.message}
          message={`Something went wrong whilst fetching the review with ID: ${review_id}. Please try again later.`}
        />
      </PageWrapper>
    );
  }

  /* 
    {
      "review_id": 14,
      "title": "Velit tempor ullamco amet ipsum dolor voluptate.",
      "category": "hidden-roles",
      "designer": "Don Keigh",
      "owner": "cooljmessy",
      "review_body": "Nostrud anim cupidatat incididunt officia cupidatat magna. Cillum commodo voluptate laboris id incididunt esse",
      "review_img_url": "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?w=700&h=700",
      "created_at": "2021-02-05T11:27:26.563Z",
      "votes": 3,
      "comment_count": 0
    }
  */
  return (
    <PageWrapper heading="Review">
      <Grid container>
        <Grid item xs={12}>
          <Paper component="section" elevation={2} sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography
                component="h2"
                color="primary"
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
              </Grid>

              {/* Review Article */}
              <Typography px={1}>{review.review_body}</Typography>

              {/* Vote bar - upvote/downvote options */}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Review;
