import { useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as gamesApi from '../api';

const ReviewInteractionsBar = ({ reviewId: review_id, votes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const queryClient = useQueryClient();
  const votesMutation = useMutation({
    mutationFn: gamesApi.patchReviewVotes,
    onSuccess: () => {
      // invalidateQuery -> make reviews data stale, which in turn forces a refetch
      queryClient.invalidateQueries(['reviews']);
    },
  });

  // Upvote/downvote functions determine what argument to invoke the mutationFn with
  const handleUpvoteClick = () => {
    if (isLiked) {
      // Already liked -> click removes 1 vote -> setIsLiked(false)
      votesMutation
        .mutateAsync({ review_id, inc_votes: -1 })
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => {
          setIsLiked(true);
        });
    } else if (isDisliked) {
      // Already disliked -> click adds 2 votes -> increment by 2 -> setIsLiked(true) & setIsDisliked(false)
      votesMutation
        .mutateAsync({ review_id, inc_votes: 2 })
        .then(() => {
          setIsLiked(true);
          setIsDisliked(false);
        })
        .catch((err) => {
          setIsLiked(false);
          setIsDisliked(true);
        });
    } else {
      // Neither liked/disliked -> click adds 1 vote -> increment by 1 -> setIsLiked(true)
      votesMutation
        .mutateAsync({ review_id, inc_votes: 1 })
        .then(() => {
          setIsLiked(true);
        })
        .catch((err) => {
          setIsLiked(false);
        });
    }
  };

  const handleDownvoteClick = () => {
    if (isDisliked) {
      // Already disliked -> click adds 1 vote
      votesMutation
        .mutateAsync({ review_id, inc_votes: 1 })
        .then(() => {
          setIsDisliked(false);
        })
        .catch((err) => {
          setIsDisliked(true);
        });
    } else if (isLiked) {
      // Already liked -> click removes 2 votes
      votesMutation
        .mutateAsync({ review_id, inc_votes: -2 })
        .then(() => {
          setIsDisliked(true);
          setIsLiked(false);
        })
        .catch((err) => {
          setIsDisliked(false);
          setIsLiked(true);
        });
    } else {
      // Neither liked/disliked -> click removes 1 vote
      votesMutation
        .mutateAsync({ review_id, inc_votes: -1 })
        .then(() => {
          setIsDisliked(true);
        })
        .catch((err) => {
          setIsDisliked(false);
        });
    }
  };

  const iconButtonStyle = { p: { xs: 1.5, md: 2 } };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Stack
        direction="row"
        gap={1}
        sx={{
          border: '1px solid rgba(0,0,0,.4)',
          // color: 'white',
          p: 1,
          borderRadius: '3rem',
          // mx: 'auto',
          textAlign: 'center',
          width: '20rem',
        }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <IconButton
          onClick={handleUpvoteClick}
          disabled={votesMutation.isLoading}
          sx={iconButtonStyle}
          aria-label="like"
        >
          {isLiked ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
        </IconButton>
        <Box sx={{ fontWeight: 'bold' }}>{votes} votes</Box>
        <IconButton
          onClick={handleDownvoteClick}
          disabled={votesMutation.isLoading}
          sx={iconButtonStyle}
          aria-label="dislike"
        >
          {isDisliked ? <ThumbDown color="primary" /> : <ThumbDownOutlined />}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ReviewInteractionsBar;
