import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';

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
                <div className="camera-icon mb-2">📸</div>
                <h2 className="fw-light tracking-widest text-uppercase mb-1">Capture</h2>
                <p className="text-muted small italic">Sign in to your gallery</p>
              </div>

              {/* Minimalist Switcher */}
              <div className="role-pill-container mb-4">
                <div className="d-flex bg-dark-soft rounded-pill p-1">
                  <button 
                    className={`flex-fill btn btn-sm rounded-pill py-2 transition ${role === 'user' ? 'bg-white shadow text-dark' : 'text-white-50'}`}
                    onClick={() => setRole('user')}
                  >Client</button>
                  <button 
                    className={`flex-fill btn btn-sm rounded-pill py-2 transition ${role === 'admin' ? 'bg-white shadow text-dark' : 'text-white-50'}`}
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
                      className="btn btn-link p-0 small text-decoration-none text-primary"
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

                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold mb-3 login-btn">
                  Enter Studio
                </button>
              </form>
              
              <div className="text-center mt-3">
                <p className="small text-muted">
                  New here? 
                  <button onClick={onRegisterClick} className="btn btn-link p-0 ms-1 small fw-bold text-decoration-none color-gold">
                    Create Portfolio
                  </button>
                </p>
                <button onClick={onBack} className="btn btn-link btn-sm text-decoration-none text-muted opacity-50">
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
                      url('https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=2058');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .camera-icon {
          font-size: 2rem;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }

        .bg-dark-soft {
          background: rgba(0, 0, 0, 0.08);
        }

        .tracking-widest {
          letter-spacing: 0.2rem;
        }

        .login-btn {
          background: #1a1a1a;
          border: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .color-gold {
          color: #b08d57 !important;
        }

        .transition {
          transition: all 0.3s ease;
        }

        /* Ensuring FormInput looks professional */
        .form-control {
          border-radius: 8px;
          padding: 0.6rem 1rem;
          border: 1px solid #ddd;
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