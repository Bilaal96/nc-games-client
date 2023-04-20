import { Alert, Box, Stack, Typography } from '@mui/material';

const defaultMessage = 'Something went wrong. Please try again later.';
const DisplayMessage = ({ error, message = defaultMessage }) => {
  return (
    <Stack direction="column" gap={2} minHeight="70vh">
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          // Take up all remaining space of flex-container
          flex: '1',
          // Content
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          textAlign: 'center',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">{message}</Typography>
      </Box>
    </Stack>
  );
};

export default DisplayMessage;
