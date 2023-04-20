import React from 'react';
import ReactDOM from 'react-dom/client';

// Contexts
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
import CSSBaseline from '@mui/material/CssBaseline';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CSSBaseline />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
