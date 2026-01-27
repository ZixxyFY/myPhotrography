import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  // Hard Coded Registration
  handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this.state data to a server here.
    // For now, we just pretend it worked.
    
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
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        className="form-control" 
                        placeholder="John Doe" 
                        value={fullName}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-bold">Password</label>
                      <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        placeholder="Create Password" 
                        value={password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
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