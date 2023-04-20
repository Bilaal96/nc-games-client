import { Box, CircularProgress, Stack, Typography } from '@mui/material';

const PageSpinner = ({ error }) => {
  return (
    <Stack direction="column" gap={2} minHeight="70vh">
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
        <Stack
          direction="column"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress sx={{ color: 'white' }} />
          <Typography variant="h6">Loading...</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PageSpinner;
