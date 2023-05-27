import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

// Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

// Components
import { Avatar, Card, Grid, Stack, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import PageWrapper from '../components/PageWrapper';
import PageSpinner from '../components/PageSpinner';
import DisplayMessage from '../components/DisplayMessage';

import * as gamesApi from '../api';

const SwitchAccounts = () => {
  const auth = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const {
    isLoading,
    error,
    data: users,
  } = useQuery({ queryKey: ['users'], queryFn: gamesApi.fetchAllUsers });
  console.log(users);

  const handleUserCardClick = (user) => {
    // Log user in
    auth.login(user);
    // Display Snackbar to notify user of login
    enqueueSnackbar(`Logged in as ${user.username}`, {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    });
  };

  if (isLoading) {
    return (
      <PageWrapper heading="Switch Account">
        <PageSpinner />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper heading="Switch Account">
        <DisplayMessage
          error={error.message}
          message="Something went wrong whilst fetching the users. Please try again later."
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper heading="Switch Account">
      {/* Info card / user prompt */}
      <Card
        sx={{
          p: 2,
          mb: 2,
          fontSize: '1.2rem',
          borderRadius: '4px',
          backgroundColor: '#ADD8E6',
          display: 'flex',
          gap: 1,
        }}
      >
        <Info color="primary" />
        <Typography>
          By switching accounts you can test user interactions (such as
          commenting or voting on reviews) from the perspective of different
          users.
        </Typography>
      </Card>

      {/* Users List */}
      <Grid container spacing={2}>
        {users.map((user, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Card
              onClick={() => handleUserCardClick(user)}
              sx={{
                p: { xs: 1, sm: 2 },
                ':hover': {
                  background: 'rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: '0.15s ease-out',
                },
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={3} alignSelf="center">
                  <Avatar
                    sx={{ ml: 'auto' }}
                    alt={`${user.username} avatar`}
                    src={user.avatar_url}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Stack direction="column">
                    <Typography component="h2" variant="h5" color="primary">
                      {user.name}
                    </Typography>
                    <Typography>
                      <strong>Display name:</strong>
                    </Typography>
                    <Typography color="secondary">
                      <strong>{user.username}</strong>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageWrapper>
  );
};

export default SwitchAccounts;
