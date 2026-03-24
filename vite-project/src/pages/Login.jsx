import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';

const Login = ({ onBack, onRegisterClick, onLoginSuccess }) => {
  // 1. Initialize State using Hooks
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Helper to switch roles and clear inputs
  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setError('');
    setEmail('');
    setPassword('');
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Role-based logic determined by email content
    let detectedRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    let isAuthenticated = false;
    let username = "";

    // Simple mock authentication success regardless of password since it's mock
    if (detectedRole === 'admin') {
      isAuthenticated = true;
      username = "Admin";
    } else {
      isAuthenticated = true;
      username = "Client User";
    }

    // Result
    if (isAuthenticated) {
      onLoginSuccess(username, detectedRole); // Call parent function
    } else {
      setError(`Invalid credentials!`);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{paddingTop: '80px'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-3 auth-card">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-3">{role === 'user' ? 'Client Login' : 'Admin Portal'}</h3>
                  <div className="btn-group w-100" role="group">
                    <button 
                      type="button" 
                      className={`btn btn-sm ${role === 'user' ? 'btn-ds-primary' : 'btn-outline-secondary'}`}
                      onClick={() => handleRoleSwitch('user')}
                    >User</button>
                    <button 
                      type="button" 
                      className={`btn btn-sm ${role === 'admin' ? 'btn-ds-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => handleRoleSwitch('admin')}
                    >Admin</button>
                  </div>
                </div>
                
                {error && <div className="alert alert-danger text-center p-2 small">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <FormInput 
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    // e.target.value is standard JS
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder={role === 'user' ? "user@test.com" : "admin@test.com"}
                    required={true}
                  />
                  <FormInput 
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456"
                    required={true}
                  />
                  <button type="submit" className={`btn-ds-primary w-100 mb-3`}>
                    Login as {role === 'user' ? 'Client' : 'Admin'}
                  </button>
                </form>
                
                <div className="text-center">
                  <button onClick={onRegisterClick} className="btn btn-link text-decoration-none small text-primary">
                    Create Account
                  </button>
                  <br/>
                  <button onClick={onBack} className="btn btn-link text-decoration-none small text-muted">
                    <i className="fas fa-arrow-left me-2"></i>Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onBack: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired
};

export default Login;