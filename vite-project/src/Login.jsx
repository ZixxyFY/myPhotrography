import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput'; // Ensure FormInput.jsx is in the same folder

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'user',
      email: '',
      password: '',
      error: ''
    };
  }

  setRole = (newRole) => {
    this.setState({ role: newRole });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // HARD CODED CREDENTIALS
    const validEmail = "user@test.com";
    const validPass = "123456";

    if (email === validEmail && password === validPass) {
      alert("Login Successful!");
      this.props.onBack();
    } else {
      this.setState({ error: "Invalid credentials! Try user@test.com / 123456" });
    }
  }

  render() {
    const { role, email, password, error } = this.state;
    const { onBack, onRegisterClick } = this.props;

    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{paddingTop: '80px'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold mb-3">{role === 'user' ? 'Client Login' : 'Admin Portal'}</h3>
                    
                    {/* Role Toggles */}
                    <div className="btn-group w-100" role="group">
                      <button 
                        className={`btn ${role === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => this.setRole('user')}
                      >User</button>
                      <button 
                        className={`btn ${role === 'admin' ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => this.setRole('admin')}
                      >Admin</button>
                    </div>
                  </div>
                  
                  {/* Error Message Display */}
                  {error && <div className="alert alert-danger text-center p-2 small">{error}</div>}

                  <form onSubmit={this.handleSubmit}>
                    
                    {/* Validated Email Input */}
                    <FormInput 
                      label="Email Address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder="user@test.com"
                      required={true}
                    />

                    {/* Validated Password Input */}
                    <FormInput 
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      placeholder="Enter password"
                      required={true}
                    />

                    <button type="submit" className={`btn w-100 mb-3 ${role === 'user' ? 'btn-primary' : 'btn-dark'}`}>
                      Login
                    </button>
                  </form>
                  
                  <div className="text-center">
                    <button onClick={onRegisterClick} className="btn btn-link text-decoration-none small text-gold">
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
  }
}

Login.propTypes = {
  onBack: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired
};

export default Login;