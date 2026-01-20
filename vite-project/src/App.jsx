import React, { Component } from 'react';
import Landing from './Landing';
import Login from './Login';
import Registration from './Registration';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'landing' // Options: 'landing', 'login', 'registration'
    };
  }

  // --- NAVIGATION METHODS ---
  navigateToLogin = () => {
    this.setState({ currentView: 'login' });
  }

  navigateToRegister = () => {
    this.setState({ currentView: 'registration' });
  }

  navigateToHome = () => {
    this.setState({ currentView: 'landing' });
  }

  render() {
    const { currentView } = this.state;

    return (
      <div className="App">
        {/* 1. LANDING PAGE */}
        {currentView === 'landing' && (
          <Landing onLoginClick={this.navigateToLogin} />
        )}

        {/* 2. LOGIN PAGE */}
        {currentView === 'login' && (
          <Login 
            onBack={this.navigateToHome} 
            onRegisterClick={this.navigateToRegister}
          />
        )}

        {/* 3. REGISTRATION PAGE */}
        {currentView === 'registration' && (
          <Registration 
            onBack={this.navigateToHome} 
            onLoginClick={this.navigateToLogin}
          />
        )}
      </div>
    );
  }
}

export default App;