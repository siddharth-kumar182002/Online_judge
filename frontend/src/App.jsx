import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import ProblemSet from './pages/ProblemSet';
import ProblemDetails from './pages/ProblemDetails';
import Profile from './pages/Profile';
import VisitUser from './pages/VisitUser';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16"> {/* Adjust this value if your navbar height is different */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/problem-set" element={<ProblemSet />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/visit/:userId" element={<VisitUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
