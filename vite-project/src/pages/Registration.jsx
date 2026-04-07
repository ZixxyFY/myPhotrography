import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';


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
          <div className="container py-5">
            <div className="row align-items-center justify-content-center min-vh-100">
              
              {/* Left Branding Section */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="brand-panel text-white pe-4">
                  <span className="brand-badge">Trinity Clicks</span>
                  <h1 className="brand-title mt-3">
                    Capture Moments. <br />
                    Create Memories.
                  </h1>
                  <p className="brand-subtitle mt-3">
                    Join our photography community and preserve every special moment
                    with timeless elegance.
                  </p>

                  <div className="brand-features mt-4">
                    <div className="feature-item">
                      <i className="fas fa-camera-retro me-2"></i>
                      Professional photography portfolio experience
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-images me-2"></i>
                      Showcase your best work beautifully
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-heart me-2"></i>
                      Designed for wedding & lifestyle storytellers
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="col-md-8 col-lg-5">
                <div className="register-card shadow-lg">
                  <div className="card-body p-4 p-md-5">
                    
                    <div className="text-center mb-4">
                      <div className="icon-circle mx-auto mb-3">
                        <i className="fas fa-camera-retro"></i>
                      </div>
                      <h2 className="fw-bold register-heading mb-1">Create Account</h2>
                      <p className="register-subtext mb-0">
                        Start your creative journey with us
                      </p>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                      <div className="mb-3">
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

                      <div className="mb-3">
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

                      <div className="mb-2">
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

                      <div className="password-hint mb-4">
                        Use at least 8 characters with a number & special symbol.
                      </div>

                      <button
                        type="submit"
                        className="register-btn w-100 mb-3"
                      >
                        <i className="fas fa-user-plus me-2"></i>
                        Get Started
                      </button>
                    </form>

                    <div className="text-center mt-3">
                      <p className="text-muted small mb-1">Already have an account?</p>
                      <button
                        onClick={onLoginClick}
                        className="login-link-btn"
                      >
                        Sign in here
                      </button>

                      <div className="divider my-3">
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
                <div className="mobile-branding text-center text-white mt-4 d-lg-none">
                  <h4 className="mb-2">Trinity Clicks</h4>
                  <p className="small mb-0">Capture your memories beautifully.</p>
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