import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from "./components/ui/button";
import { Toaster, toast } from 'react-hot-toast';
import appRoutes from './routes';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  const [user, setUser] = useState<{ name: string; email: string; access_token: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    toast.success('Logged out successfully!');
  };

  const isAdmin = Boolean(localStorage.getItem('admin_access_token') && localStorage.getItem('admin'));

  const handleAdminLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_access_token');
    toast.success('Logged out successfully!');
    
  };

  // Memoize routes with user/setUser injected for Login
  const routesWithProps = useMemo(() => appRoutes.map(r =>
    r.path === '/login'
      ? { ...r, element: <Login user={user} setUser={setUser} /> }
      : r
  ), [user, setUser]);

  return (
    <Router>
      <Toaster position="top-center" />
      {isAdmin && (
        <Button
          className="fixed top-6 right-8 bg-white text-red-700 border border-red-700 hover:bg-red-50 font-semibold shadow z-50"
          onClick={handleAdminLogout}
        >
          Logout
        </Button>
      )}
      {user && !isAdmin && (
        <Button
          className="fixed top-6 right-8 bg-white text-red-700 border border-red-700 hover:bg-red-50 font-semibold shadow z-50"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
      {/* Admin session check: if admin is logged in, show all admin routes */}
      {isAdmin ? (
        <div className="logged-in-wrapper">
      <div style={{ textAlign: 'center', color: '#1976d2', fontSize: '3rem', fontWeight: 800 }}>
        Welcome, {JSON.parse(localStorage.getItem('admin') || '{}').name || 'Admin'}!
      </div>
          <Routes>
            {routesWithProps.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
          </Routes>
        </div>
      ) : user ? (
        <div className="logged-in-wrapper">
          <div style={{ textAlign: 'center', color: '#1976d2', fontSize: '3rem', fontWeight: 800, margin: '2.5rem 0 2rem 0' }}>
            Welcome, {user.name}!
          </div>
          <Routes>
            {routesWithProps.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
          </Routes>
        </div>
      ) : (
        <div className="form-card" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Routes>
            {routesWithProps.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;