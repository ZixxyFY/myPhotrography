import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import './user/Registration.css'; 

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: this.state.fullName,
          email: this.state.email,
          password: this.state.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        this.setState({ fullName: '', email: '', password: '' });
        this.props.onLoginClick();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  render() {
    const { onBack, onLoginClick } = this.props;
    const { fullName, email, password } = this.state;

    return (
      <div className="register-page">
        <div className="register-overlay">
          {/* Compressed vertical padding (py-2) */}
          <div className="container py-2">
            <div className="row align-items-center justify-content-center min-vh-100">
              
              {/* Left Branding Section */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="brand-panel text-white pe-4">
                  <span className="brand-badge">E-Imagination</span>
                  <h1 className="brand-title mt-2 mb-1">
                    Capture Moments. <br />
                    Create Memories.
                  </h1>
                  <p className="brand-subtitle mt-2 mb-2">
                    Join our photography community and preserve every special moment
                    with timeless elegance.
                  </p>

                  <div className="brand-features mt-2">
                    <div className="feature-item">
                      <i className="fas fa-camera-retro me-2" style={{color: '#C5A059'}}></i>
                      Professional photography portfolio experience
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-images me-2" style={{color: '#C5A059'}}></i>
                      Showcase your best work beautifully
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-heart me-2" style={{color: '#C5A059'}}></i>
                      Designed for wedding & lifestyle storytellers
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="col-md-8 col-lg-5">
                <div className="register-card shadow-lg">
                  {/* Compressed card padding (p-3 p-md-4) */}
                  <div className="card-body p-3 p-md-4">
                    
                    <div className="text-center mb-2">
                      <div className="icon-circle mx-auto mb-2">
                        <i className="fas fa-camera"></i>
                      </div>
                      <h2 className="fw-bold register-heading mb-1" style={{fontFamily: "'Playfair Display', serif"}}>Create Account</h2>
                      <p className="register-subtext mb-0">
                        Start your creative journey with us
                      </p>
                    </div>

                    <form onSubmit={this.handleSubmit} className="compact-form">
                      <div className="mb-2">
                        <FormInput
                          label="Full Name"
                          type="text"
                          name="fullName"
                          value={fullName}
                          onChange={this.handleChange}
                          placeholder="Enter your full name"
                          required={true}
                          pattern="[A-Za-z ]{3,}"
                          errorMsg="At least 3 letters, no numbers."
                        />
                      </div>

                      <div className="mb-2">
                        <FormInput
                          label="Email Address"
                          type="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          placeholder="name@example.com"
                          required={true}
                          errorMsg="Please enter a valid email."
                        />
                      </div>

                      <div className="mb-1">
                        <FormInput
                          label="Password"
                          type="password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                          placeholder="••••••••"
                          required={true}
                          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$"
                          errorMsg="Min 8 chars, 1 letter, 1 number, 1 special char."
                        />
                      </div>

                      <div className="password-hint mb-2">
                        Use at least 8 characters with a number & special symbol.
                      </div>

                      <button
                        type="submit"
                        className="register-btn w-100 mb-2 mt-1"
                      >
                        <i className="fas fa-user-plus me-2"></i>
                        Get Started
                      </button>
                    </form>

                    <div className="text-center mt-2">
                      <p className="small mb-1" style={{color: '#A0A0A0'}}>Already have an account?</p>
                      <button
                        onClick={onLoginClick}
                        className="login-link-btn"
                      >
                        Sign in here
                      </button>

                      <div className="divider my-2">
                        <span>or</span>
                      </div>

                      <button
                        onClick={onBack}
                        className="back-btn"
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Branding */}
                <div className="mobile-branding text-center mt-3 d-lg-none" style={{color: '#F5F5F7'}}>
                  <h4 className="mb-1" style={{fontFamily: "'Playfair Display', serif"}}>E-Imagination</h4>
                  <p className="small mb-0" style={{color: '#A0A0A0'}}>Capture your memories beautifully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  onBack: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired
};

export default Registration;