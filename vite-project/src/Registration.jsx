import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput'; // Import the reusable component

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
  }

  // Hard Coded Registration Logic
  handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this.state data to a server here.
    
    alert(`Account created for ${this.state.fullName}! Please Login.`);
    this.props.onLoginClick(); // Redirect to Login page
  }

  render() {
    const { onBack, onLoginClick } = this.props;
    const { fullName, email, password } = this.state;

    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{paddingTop: '80px'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-3 text-center">Sign Up</h3>
                  
                  <form onSubmit={this.handleSubmit}>
                    
                    {/* Full Name Input with Regex Validation */}
                    <FormInput 
                      label="Full Name"
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={this.handleChange}
                      placeholder="John Doe"
                      required={true}
                      // Regex: Must be at least 3 letters, spaces allowed, no numbers
                      pattern="[A-Za-z ]{3,}"
                      errorMsg="Name must be at least 3 letters (no numbers)."
                    />

                    {/* Email Input */}
                    <FormInput 
                      label="Email Address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder="name@example.com"
                      required={true}
                      errorMsg="Please enter a valid email address."
                    />

                    {/* Password Input with Strong Regex Validation */}
                    <FormInput 
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      placeholder="Create Password"
                      required={true}
                      // Regex: Min 8 chars, at least 1 letter and 1 number
                      pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$"

                      errorMsg="Password must be min 8 chars, with at least 1 letter, 1 special character and 1 number."
                    />

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                      Register
                    </button>
                  </form>
                  
                  <div className="text-center">
                    <button onClick={onLoginClick} className="btn btn-link text-decoration-none small text-gold">
                      Already have an account? Login
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
  }
}

Registration.propTypes = {
  onBack: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired
};

export default Registration;