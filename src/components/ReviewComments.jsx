import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

// Contexts
import { AuthContext } from '../contexts/Auth';

// Components
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ReviewCommentForm from './ReviewCommentForm';
import DisplayMessage from './DisplayMessage';
import OptionsMenu from './OptionsMenu';
import ConfirmationDialog from './ConfirmationDialog';

import * as gamesApi from '../api';

const ReviewComments = ({ reviewId: review_id, comments }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: gamesApi.deleteReviewComment,
    onSuccess: () => {
      // Notify user of successful comment deletion
      enqueueSnackbar('Comment deleted');

      // Refetch comments
      queryClient.invalidateQueries(['reviews', review_id, 'comments']);
    },
    onError: () => {
      enqueueSnackbar('Failed to delete comment, try again later', {
        variant: 'error',
      });
    },
  });

  // Handles API request & response for deleting a comment
  const handleDeleteComment = (comment_id) => {
    deleteCommentMutation.mutate({ comment_id });
  };

  return (
    <Stack spacing={2}>
      {/* Modal to confirm & initiate comment deletion request */}
      <ConfirmationDialog
        title="Delete Comment"
        content="Delete comment permanently?"
        open={modalOpen}
        setOpen={setModalOpen}
        onConfirm={() => handleDeleteComment(selectedComment)}
        onClose={() => setSelectedComment(null)}
      />

      {/* Comments Section */}
      <Typography
        color="primary"
        component="h3"
        sx={{ typography: { xs: 'h6', md: 'h5' } }}
      >
        Comments
      </Typography>

      {/* Form to post new comment */}
      <ReviewCommentForm reviewId={review_id} />

      {/* Comments List */}
      <Stack divider={<Divider sx={{ my: 2 }} />}>
        {comments.length ? (
          comments.map((comment) => (
            <Box key={comment.comment_id}>
              <Stack direction="row" spacing={1}>
                {/* Comment */}
                <Stack sx={{ flex: '1 1 auto' }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {comment.author}
                  </Typography>
                  <Typography>{comment.body}</Typography>
                </Stack>

                {/* More Options - only renders when comment author is logged in */}
                {comment.author === user.username && (
                  <OptionsMenu
                    menuItems={[
                      {
                        icon: <Delete fontSize="small" />,
                        text: 'Delete',
                        handleClick: () => {
                          setSelectedComment(comment.comment_id);
                          setModalOpen(true);
                        },
                      },
                    ]}
                  />
                )}
              </Stack>
            </Box>
          ))
        ) : (
          <DisplayMessage message="No comments" />
        )}
      </Stack>
    </Stack>
  );
};

export default ReviewComments;
