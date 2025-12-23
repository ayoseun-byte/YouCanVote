import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import CreateElection from './pages/CreateElection';
import ManageElection from './pages/ManageElection';
import JoinElection from './pages/JoinElection';
import VerifyOTP from './pages/VerifyOTP';
import VotePage from './pages/VotePage';
import LiveResults from './pages/LiveResults';
import FinalResults from './pages/FinalResults';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/election/create" element={<CreateElection />} />
        <Route path="/admin/election/:id" element={<ManageElection />} />
        <Route path="/join" element={<JoinElection />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/vote/:id" element={<VotePage />} />
        <Route path="/results/live/:id" element={<LiveResults />} />
        <Route path="/results/final/:id" element={<FinalResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
