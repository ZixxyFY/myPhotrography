import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput'; 

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
    this.setState({ role: newRole, error: '', email: '', password: '' });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, role } = this.state;

    const validUserEmail = "user@test.com";
    const validAdminEmail = "admin@test.com";
    const validPass = "123456";

    let isAuthenticated = false;
    let username = "";

    if (role === 'user' && email === validUserEmail && password === validPass) {
      isAuthenticated = true;
      username = "John Doe"; 
    } else if (role === 'admin' && email === validAdminEmail && password === validPass) {
      isAuthenticated = true;
      username = "Admin User";
    }

    if (isAuthenticated) {
      // Pass BOTH username and role to App.jsx
      this.props.onLoginSuccess(username, role); 
    } else {
      this.setState({ 
        error: `Invalid ${role} credentials!` 
      });
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
                    <div className="btn-group w-100" role="group">
                      <button 
                        type="button" 
                        className={`btn ${role === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => this.setRole('user')}
                      >User</button>
                      <button 
                        type="button" 
                        className={`btn ${role === 'admin' ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => this.setRole('admin')}
                      >Admin</button>
                    </div>
                  </div>
                  
                  {error && <div className="alert alert-danger text-center p-2 small">{error}</div>}

                  <form onSubmit={this.handleSubmit}>
                    <FormInput 
                      label="Email Address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder={role === 'user' ? "user@test.com" : "admin@test.com"}
                      required={true}
                    />
                    <FormInput 
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      placeholder="123456"
                      required={true}
                    />
                    <button type="submit" className={`btn w-100 mb-3 ${role === 'user' ? 'btn-primary' : 'btn-dark'}`}>
                      Login as {role === 'user' ? 'Client' : 'Admin'}
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
  onRegisterClick: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired
};

export default Login;