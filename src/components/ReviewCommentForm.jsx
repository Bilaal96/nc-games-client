import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

// Contexts
import { AuthContext } from '../contexts/Auth';

// Components
import { Button, Stack, TextField } from '@mui/material';

import * as gamesApi from '../api';

const StyledButton = ({ children, sx, ...otherProps }) => {
  return (
    <Button
      sx={{ width: 'max-content', ...sx }}
      variant="outlined"
      {...otherProps}
    >
      {children}
    </Button>
  );
};

const ReviewCommentForm = ({ reviewId: review_id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const [showFormActions, setShowFormActions] = useState(false);

  const queryClient = useQueryClient();
  const postComment = useMutation({
    mutationFn: gamesApi.postReviewComment,
    onSuccess: () => {
      // Reset form
      setComment('');
      setShowFormActions(false);
      // Notify user of success
      enqueueSnackbar('Comment added', { variant: 'success' });
      // Refetch comments
      queryClient.invalidateQueries(['reviews', review_id, 'comments']);
    },
    onError: () => {
      enqueueSnackbar(
        'Something went wrong, failed to add comment. Please try again later',
        { variant: 'error' }
      );
    },
  });

  // Control TextField
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  // Reset TextField value & hide action buttons
  const handleCancel = () => {
    setComment('');
    setShowFormActions(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prevent submission of empty comments
    if (!comment.trim()) {
      return enqueueSnackbar('Invalid comment, try again.', {
        variant: 'error',
      });
    }

    // Make post request to add user comment
    const newComment = { username: user.username, body: comment };
    postComment.mutate({ review_id, newComment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={{ xs: 1, md: 2 }}>
        {/* Comment Input */}
        <TextField
          id="post-comment"
          placeholder="Add a comment..."
          variant="standard"
          multiline
          onChange={handleChange}
          onFocus={() => setShowFormActions(true)}
          value={comment}
          aria-label="Add a comment"
        />

        {/* Form Actions */}
        {showFormActions && (
          <Stack
            className="form-actions"
            direction="row"
            spacing={1}
            justifyContent={{ xs: 'flex-end', md: 'flex-start' }}
          >
            <StyledButton onClick={handleCancel} type="button" color="error">
              Cancel
            </StyledButton>
            <StyledButton type="submit">Comment</StyledButton>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export default ReviewCommentForm;
