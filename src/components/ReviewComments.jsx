import { Box, Divider, Stack, Typography } from '@mui/material';
import DisplayMessage from './DisplayMessage';

const ReviewComments = ({ comments }) => {
  return (
    <Stack spacing={2}>
      <Typography
        color="primary"
        component="h3"
        sx={{ typography: { xs: 'h6', md: 'h5' } }}
      >
        Comments
      </Typography>

      <Stack divider={<Divider sx={{ my: 2 }} />}>
        {comments.length ? (
          comments.map((comment) => (
            <Box key={comment.comment_id}>
              <Stack>
                <Typography sx={{ fontWeight: 700 }}>
                  {comment.author}
                </Typography>
                <Typography>{comment.body}</Typography>
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
