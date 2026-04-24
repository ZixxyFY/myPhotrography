import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import { Camera, CheckCircle } from 'lucide-react';

const ResetPassword = ({ token, onSuccess }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setStatus('error');
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to reset password. The link might be expired.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Network error. Please ensure the backend server is running.');
    }
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
                <h2 className="capture-header mb-1">NEW PASSWORD</h2>
                <p className="subtext-header">Secure your gallery</p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-4">
                  <CheckCircle size={48} color="#C5A059" className="mb-3" />
                  <h4 style={{ color: '#F5F5F7', fontFamily: 'Playfair Display' }}>Password Updated</h4>
                  <p className="small text-a0a0a0 mt-2 mb-4">
                    Your password has been successfully reset. You can now log in using your new credentials.
                  </p>
                  <button onClick={onSuccess} className="login-btn w-100 py-2">
                    Proceed to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <FormInput 
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <FormInput 
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className="alert alert-danger p-2 small text-center mb-3" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#ff6b6b', border: '1px solid rgba(220, 53, 69, 0.3)' }}>
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="login-btn w-100 py-2 mb-4 d-flex justify-content-center align-items-center"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" style={{ marginRight: '8px' }}></span>
                    ) : 'Update Password'}
                  </button>
                  
                </form>
              )}
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

        .login-btn {
          background: #C5A059;
          color: #1A1A1B;
          border: none;
          font-weight: 700;
          letter-spacing: 1px;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(197, 160, 89, 0.3);
          color: #1A1A1B;
        }
        
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .text-a0a0a0 {
          color: #A0A0A0 !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

ResetPassword.propTypes = {
  token: PropTypes.string,
  onSuccess: PropTypes.func.isRequired
};

export default ResetPassword;
