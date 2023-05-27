import React from 'react';
import ReactDOM from 'react-dom/client';

// Contexts
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/Auth';

// Components
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CSSBaseline from '@mui/material/CssBaseline';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: 5 mins -> stale after 5 mins
       * Default cacheTime: 5 mins -> expire cache after 5 mins
       
       * When data is stale AND cache is VALID, data is read from the cache and re-fetched in the BACKGROUND 
       * The fresh data is used for the next render
       * So (when using isLoading) a UI loading state is NOT visible 
       
       * When data is stale AND cache is EXPIRED, data CANNOT be read from the cache
       * The data is re-fetched in the FOREGROUND (i.e. UI loading state is visible) and then cached
       
       * Whilst data is fresh, it is always read from the cache and avoids refetching and rendering loading UIs on component remounts - e.g. when navigating through browser history
       */
      staleTime: 1000 * 60 * 5,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={1} autoHideDuration={3000} preventDuplicate>
          <AuthProvider>
            <CSSBaseline />
            <App />
            {process.env?.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
