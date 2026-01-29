import React, { Component } from 'react';
import Landing from './Landing';
import Login from './Login';
import Registration from './Registration';
import RentalShop from './RentalShop'; // <--- IMPORT THIS
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'landing' // 'landing', 'login', 'registration', 'rental'
    };
  }

  // --- NAVIGATION METHODS ---
  navigateToLogin = () => { this.setState({ currentView: 'login' }); }
  navigateToRegister = () => { this.setState({ currentView: 'registration' }); }
  navigateToHome = () => { this.setState({ currentView: 'landing' }); }
  
  // New Method
  navigateToRental = () => { this.setState({ currentView: 'rental' }); }

  render() {
    const { currentView } = this.state;

    return (
      <div className="App">
        {/* 1. LANDING PAGE - Pass the rental navigation prop */}
        {currentView === 'landing' && (
          <Landing 
            onLoginClick={this.navigateToLogin} 
            onShopClick={this.navigateToRental} 
          />
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

        {/* 4. RENTAL SHOP PAGE */}
        {currentView === 'rental' && (
           <RentalShop onBack={this.navigateToHome} />
        )}
      </div>
    );
  }
}

export default App;