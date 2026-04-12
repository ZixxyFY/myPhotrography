import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import { Camera } from 'lucide-react';

const Login = ({ onBack, onRegisterClick, onLoginSuccess, onForgotPassword }) => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let detectedRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    onLoginSuccess(detectedRole === 'admin' ? "Studio Manager" : "Client", detectedRole);
  };

  return (
    <div className="auth-wrapper">
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="glass-card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              
              {/* Artistic Header */}
              <div className="text-center mb-4">
                <div className="camera-icon mb-2"><Camera color="#C5A059" size={36} /></div>
                <h2 className="capture-header mb-1">CAPTURE</h2>
                <p className="subtext-header">Sign in to your gallery</p>
              </div>

              {/* Minimalist Switcher */}
              <div className="role-pill-container mb-4">
                <div className="d-flex toggle-container">
                  <button 
                    className={`flex-fill btn btn-sm rounded-pill py-2 toggle-pill ${role === 'user' ? 'active' : ''}`}
                    onClick={() => setRole('user')}
                  >Client</button>
                  <button 
                    className={`flex-fill btn btn-sm rounded-pill py-2 toggle-pill ${role === 'admin' ? 'active' : ''}`}
                    onClick={() => setRole('admin')}
                  >Admin</button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <FormInput 
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="hello@studio.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label mb-0 small fw-bold">Password</label>
                    <button 
                      type="button" 
                      onClick={onForgotPassword} 
                      className="btn btn-link p-0 small text-decoration-none color-gold"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <FormInput 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button type="submit" className="login-btn w-100 py-2 mb-3">
                  Enter Studio
                </button>
              </form>
              
              <div className="text-center mt-3">
                <p className="small text-a0a0a0">
                  New here? 
                  <button onClick={onRegisterClick} className="btn btn-link p-0 ms-1 small fw-bold text-decoration-none color-gold">
                    Create Portfolio
                  </button>
                </p>
                <button onClick={onBack} className="btn btn-link btn-sm text-decoration-none text-a0a0a0 opacity-50">
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          background: linear-gradient(rgba(26, 26, 27, 0.65), rgba(26, 26, 27, 0.65)), 
                      url('https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=2058');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
        }

        .glass-card {
          background: rgba(36, 36, 38, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(197, 160, 89, 0.25);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .camera-icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .capture-header {
          font-family: 'Playfair Display', serif;
          color: #F5F5F7;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .subtext-header {
          font-family: 'Montserrat', sans-serif;
          color: #A0A0A0;
          font-size: 0.875rem;
          margin-bottom: 0;
        }

        .toggle-container {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 99px;
          padding: 4px;
        }

        .toggle-pill {
          font-weight: 500;
          background: transparent;
          color: #A0A0A0;
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .toggle-pill.active {
          background: rgba(197, 160, 89, 0.15);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.4);
          box-shadow: none;
        }

        .login-btn {
          background: #C5A059;
          color: #1A1A1B;
          border: none;
          font-weight: 700;
          letter-spacing: 1px;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(197, 160, 89, 0.3);
          color: #1A1A1B;
        }

        .color-gold {
          color: #C5A059 !important;
        }
        
        .text-a0a0a0 {
          color: #A0A0A0 !important;
          transition: color 0.3s ease;
        }

        /* Ensuring FormInput looks professional */
        .form-control, .form-control:not(:focus) {
          background: rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #F5F5F7 !important;
          border-radius: 8px;
        }

        .form-control:focus {
          background: rgba(0, 0, 0, 0.3) !important;
          color: #F5F5F7 !important;
          border-color: #C5A059 !important;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15) !important;
          outline: none !important;
        }

        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }

        .form-label {
          font-size: 0.875rem !important;
          font-weight: bold !important;
          color: #A0A0A0 !important;
        }
      `}</style>
    </div>
  );
};

Login.propTypes = {
  onBack: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired
};

export default Login;