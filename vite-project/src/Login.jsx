import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'user'
    };
  }

  setRole = (newRole) => {
    this.setState({ role: newRole });
  }

  render() {
    const { role } = this.state;
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
                        className={`btn ${role === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => this.setRole('user')}
                      >User</button>
                      <button 
                        className={`btn ${role === 'admin' ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => this.setRole('admin')}
                      >Admin</button>
                    </div>
                  </div>
                  
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input type="email" className="form-control" placeholder="name@example.com" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-bold">Password</label>
                      <input type="password" className="form-control" placeholder="********" />
                    </div>
                    <button className={`btn w-100 mb-3 ${role === 'user' ? 'btn-primary' : 'btn-dark'}`}>
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

export default Login;