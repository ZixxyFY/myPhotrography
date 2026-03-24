import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import EquipmentRental from './pages/user/EquipmentRental';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import './styles/App.css';
import './styles/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // --- NAVIGATION ---
  const navigateToLogin = () => setCurrentView('login');
  const navigateToRegister = () => setCurrentView('registration');
  const navigateToHome = () => setCurrentView('landing');
  const navigateToRental = () => setCurrentView('rental');
  
  // NEW: Helper to open the correct dashboard based on who is logged in
  const navigateToDashboard = () => {
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (role === 'user') {
      setCurrentView('user-dashboard');
    }
  };

  // --- AUTHENTICATION ---
  const handleLoginSuccess = (username, userRole) => {
    setUser(username);
    setRole(userRole);
    
    // REDIRECT LOGIC UPDATED:
    if (userRole === 'admin') {
      // Admins usually want to go straight to work
      setCurrentView('admin-dashboard');
    } else {
      // Users stay on Landing Page (Home) to browse, 
      // but they are now logged in.
      setCurrentView('landing'); 
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setCurrentView('landing');
  };

  return (
    <div className="App">
      {/* LANDING PAGE */}
      {currentView === 'landing' && (
        <Landing 
          user={user} 
          onLoginClick={navigateToLogin} 
          onShopClick={navigateToRental}
          onLogout={handleLogout}
          // PASS THE DASHBOARD NAVIGATION FUNCTION
          onDashboardClick={navigateToDashboard} 
        />
      )}

      {/* LOGIN PAGE */}
      {currentView === 'login' && (
        <Login 
          onBack={navigateToHome} 
          onRegisterClick={navigateToRegister}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {/* REGISTRATION PAGE */}
      {currentView === 'registration' && (
        <Registration 
          onBack={navigateToHome} 
          onLoginClick={navigateToLogin}
        />
      )}

      {/* EQUIPMENT RENTAL PAGE */}
      {currentView === 'rental' && (
        <EquipmentRental onBack={navigateToHome} />
      )}

      {/* ADMIN DASHBOARD */}
      {currentView === 'admin-dashboard' && role === 'admin' && (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* USER DASHBOARD */}
      {currentView === 'user-dashboard' && role === 'user' && (
          <UserDashboard 
            user={user} 
            onLogout={handleLogout} 
          />
      )}
    </div>
  );
};

export default App;