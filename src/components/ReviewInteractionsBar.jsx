import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from '../hooks/useLocalStorage';

// Contexts
import { AuthContext } from '../contexts/Auth';

// Components
import { Box, IconButton, Stack } from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
} from '@mui/icons-material';

import * as gamesApi from '../api';

const ReviewInteractionsBar = ({ review }) => {
  const { user } = useContext(AuthContext);
  const { review_id } = review;

  const [votes, setVotes] = useLocalStorage(
    `${user.username}-review-${review_id}`,
    { isLiked: false, isDisliked: false }
  );

  const queryClient = useQueryClient();
  const votesMutation = useMutation({
    mutationFn: gamesApi.patchReviewVotes,
    onSuccess: (updatedReview) => {
      // invalidateQuery -> make reviews data stale, which in turn forces a refetch
      queryClient.invalidateQueries(['reviews']);
    },
  });

  // Upvote/downvote functions determine what argument to invoke the mutationFn with
  const handleUpvoteClick = () => {
    if (votes.isLiked) {
      // Already liked -> click removes 1 vote -> setIsLiked(false)
      votesMutation
        .mutateAsync({ review_id, inc_votes: -1 })
        .then(() => {
          setVotes((prevVotes) => ({ ...prevVotes, isLiked: false }));
        })
        .catch((err) => {
          setVotes((prevVotes) => ({ ...prevVotes, isLiked: true }));
        });
    } else if (votes.isDisliked) {
      // Already disliked -> click adds 2 votes -> increment by 2 -> setIsLiked(true) & setIsDisliked(false)
      votesMutation
        .mutateAsync({ review_id, inc_votes: 2 })
        .then(() => {
          setVotes({ isLiked: true, isDisliked: false });
        })
        .catch((err) => {
          setVotes({ isLiked: false, isDisliked: true });
        });
    } else {
      // Neither liked/disliked -> click adds 1 vote -> increment by 1 -> setIsLiked(true)
      votesMutation
        .mutateAsync({ review_id, inc_votes: 1 })
        .then(() => {
          setVotes((prevVotes) => ({ ...prevVotes, isLiked: true }));
        })
        .catch((err) => {
          setVotes((prevVotes) => ({ ...prevVotes, isLiked: false }));
        });
    }
  };

  const handleDownvoteClick = () => {
    if (votes.isDisliked) {
      // Already disliked -> click adds 1 vote
      votesMutation
        .mutateAsync({ review_id, inc_votes: 1 })
        .then(() => {
          setVotes((prevVotes) => ({ ...prevVotes, isDisliked: false }));
        })
        .catch((err) => {
          setVotes((prevVotes) => ({ ...prevVotes, isDisliked: true }));
        });
    } else if (votes.isLiked) {
      // Already liked -> click removes 2 votes
      votesMutation
        .mutateAsync({ review_id, inc_votes: -2 })
        .then(() => {
          setVotes({ isLiked: false, isDisliked: true });
        })
        .catch((err) => {
          setVotes({ isLiked: true, isDisliked: false });
        });
    } else {
      // Neither liked/disliked -> click removes 1 vote
      votesMutation
        .mutateAsync({ review_id, inc_votes: -1 })
        .then(() => {
          setVotes((prevVotes) => ({ ...prevVotes, isDisliked: true }));
        })
        .catch((err) => {
          setVotes((prevVotes) => ({ ...prevVotes, isDisliked: false }));
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
          border: '1px solid rgba(0,0,0,0.4)',
          p: 1,
          borderRadius: '3rem',
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
          {votes.isLiked ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
        </IconButton>
        <Box sx={{ fontWeight: 'bold' }}>{review.votes} votes</Box>
        <IconButton
          onClick={handleDownvoteClick}
          disabled={votesMutation.isLoading}
          sx={iconButtonStyle}
          aria-label="dislike"
        >
          {votes.isDisliked ? (
            <ThumbDown color="primary" />
          ) : (
            <ThumbDownOutlined />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ReviewInteractionsBar;
