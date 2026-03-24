import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ user, onLoginClick, onDashboardClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark pt-4 px-4 sticky-top pb-3" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
      <div className="container-fluid">
        <a className="navbar-brand text-warning fw-bold d-lg-none" href="#">STUDIO</a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav gap-lg-4">
            <li className="nav-item"><a className="nav-link text-white" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#about">About us</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#portfolio">Portfolio</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#contact">Contact us</a></li>
          </ul>

          <ul className="navbar-nav align-items-center">
            {user ? (
               <li className="nav-item">
                 <button onClick={onDashboardClick} className="btn text-white fw-bold d-flex align-items-center gap-2" style={{background: 'none', border: 'none'}}>
                   <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                     <i className="fas fa-user"></i>
                   </div>
                   Hi, {typeof user === 'string' ? user : user.name}
                 </button>
               </li>
            ) : (
               <li className="nav-item">
                 <button onClick={onLoginClick} className="btn text-white d-flex align-items-center gap-2" style={{background: 'none', border: 'none'}}>
                   <i className="fas fa-user text-warning"></i> 
                   <span className="fw-500">Sign In | Log In</span>
                 </button>
               </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.any,
  onLoginClick: PropTypes.func.isRequired,
  onDashboardClick: PropTypes.func.isRequired
};

export default Navbar;
