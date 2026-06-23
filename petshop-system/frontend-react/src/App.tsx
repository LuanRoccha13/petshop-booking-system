import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider, useAuth } from './hooks/useAuth';

function PrivateRoute() {
  const { token } = useAuth();
  return token ? <DashboardPage /> : <Navigate to="/login" replace />;
}

function HomeRoute() {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
