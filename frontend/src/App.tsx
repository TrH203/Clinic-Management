import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import News from './pages/News';
import Services from './pages/Services';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PublicLayout from './components/PublicLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/services" element={<Services />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
