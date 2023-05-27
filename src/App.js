// Pages
import Home from './pages/Home';
import Review from './pages/Review';
import SwitchAccounts from './pages/SwitchAccounts';

// Components
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* Navbar is fixed to top, Toolbar offsets the Container (below) so that it appears below the Navbar correctly */}
      <Navbar />
      <Toolbar />

      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" replace={true} />} />
          <Route path="/reviews" element={<Home />} />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="/switch-account" element={<SwitchAccounts />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
