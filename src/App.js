// Components
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Review from './pages/Review';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toolbar />

      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" replace={true} />} />
          <Route path="/reviews" element={<Home />} />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="/auth" element={<h1>Auth</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
