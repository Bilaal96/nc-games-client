// Components
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toolbar />

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" replace={true} />} />
          <Route path="/reviews" element={<Home />} />
          <Route path="/reviews/:review_id" element={<h1>Review</h1>} />
          <Route path="/auth" element={<h1>Auth</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
