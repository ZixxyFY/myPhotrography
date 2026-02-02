import React, { Component } from 'react';
import Landing from './Landing';
import Login from './Login';
import Registration from './Registration';
import RentalShop from './RentalShop';
import Dashboard from './Dashboard';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'landing',
      user: null, 
      role: null // <--- NEW: Track if they are 'admin' or 'user'
    };
  }

  // --- NAVIGATION ---
  navigateToLogin = () => { this.setState({ currentView: 'login' }); }
  navigateToRegister = () => { this.setState({ currentView: 'registration' }); }
  navigateToHome = () => { this.setState({ currentView: 'landing' }); }
  navigateToRental = () => { this.setState({ currentView: 'rental' }); }

  // --- AUTHENTICATION ---
  
  handleLoginSuccess = (username, role) => {
    this.setState({ 
      user: username,
      role: role 
    }, () => {
      // REDIRECT LOGIC
      if (role === 'admin') {
        this.setState({ currentView: 'dashboard' });
      } else {
        this.setState({ currentView: 'landing' });
      }
    });
  }

  handleLogout = () => {
    this.setState({ 
      user: null, 
      role: null,
      currentView: 'landing' 
    });
  }

  render() {
    const { currentView, user, role } = this.state;

    return (
      <div className="App">
        {/* LANDING PAGE: Pass 'user' and 'onLogout' to change UI */}
        {currentView === 'landing' && (
          <Landing 
            user={user} 
            onLoginClick={this.navigateToLogin} 
            onShopClick={this.navigateToRental}
            onLogout={this.handleLogout}
          />
        )}

        {currentView === 'login' && (
          <Login 
            onBack={this.navigateToHome} 
            onRegisterClick={this.navigateToRegister}
            onLoginSuccess={this.handleLoginSuccess} 
          />
        )}

        {currentView === 'registration' && (
          <Registration 
            onBack={this.navigateToHome} 
            onLoginClick={this.navigateToLogin}
          />
        )}

        {currentView === 'rental' && (
           <RentalShop onBack={this.navigateToHome} />
        )}

        {/* DASHBOARD: Only show if view is dashboard AND role is admin */}
        {currentView === 'dashboard' && role === 'admin' && (
           <Dashboard 
             user={user} 
             onLogout={this.handleLogout} 
           />
        )}
      </div>
    );
  }
}

export default App;