import { Box, Typography } from '@mui/material';

const PageHeading = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        mb: 2,
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" component="h1" align="center">
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeading;
