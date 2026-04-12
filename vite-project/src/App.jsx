import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import EquipmentRental from './pages/user/EquipmentRental';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Profile from './pages/user/Profile';
import Navbar from './components/Navbar';
import './styles/App.css';
import './styles/theme.css';


const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // --- NAVIGATION ---
  const navigateToLogin = () => setCurrentView('login');
  const navigateToRegister = () => setCurrentView('registration');
  const navigateToHome = () => setCurrentView('landing');
  const navigateToRental = () => setCurrentView('rental');
  const navigateToProfile = () => setCurrentView('profile');
  
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
    
    if (userRole === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
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
          onDashboardClick={navigateToDashboard} 
          onProfileClick={navigateToProfile}
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
            onHomeClick={navigateToHome} /* FIX: Passed Home Click */
          />
      )}

      {/* PROFILE PAGE */}
      {currentView === 'profile' && user && (
        <div style={{ backgroundColor: '#1A1A1B', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
          <Navbar 
            user={user}
            onLoginClick={navigateToLogin}
            onDashboardClick={navigateToDashboard}
            onLogout={handleLogout}
            onProfileClick={navigateToProfile}
            onHomeClick={navigateToHome} /* FIX: Passed Home Click to separate Navbar */
          />
          <Profile user={user} />
        </div>
      )}
    </div>
  );
};

export default App;