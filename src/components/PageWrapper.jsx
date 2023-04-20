import { Box } from '@mui/material';
import PageHeading from './PageHeading';

const PageWrapper = ({ heading, children }) => (
  <Box component="main">
    <PageHeading>{heading}</PageHeading>
    {children}
  </Box>
);

export default PageWrapper;
