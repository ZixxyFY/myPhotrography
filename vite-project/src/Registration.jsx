import React, { Component } from 'react';

class Registration extends Component {
  render() {
    const { onBack, onLoginClick } = this.props;

    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{paddingTop: '80px'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-3 text-center">Sign Up</h3>
                  
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Full Name</label>
                      <input type="text" className="form-control" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input type="email" className="form-control" placeholder="name@example.com" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-bold">Password</label>
                      <input type="password" className="form-control" placeholder="Create Password" />
                    </div>
                    <button className="btn btn-primary w-100 mb-3">
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

export default Registration;