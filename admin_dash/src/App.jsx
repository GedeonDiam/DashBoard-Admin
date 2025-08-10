import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Analytics from './pages/Analytics';  
import './assets/fonts/fonts.css';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
