import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const servicesData = [
  { icon: "fas fa-camera", title: "Portrait Photography", desc: "Professional headshots." },
  { icon: "fas fa-heart", title: "Wedding & Events", desc: "Full-day coverage." },
  { icon: "fas fa-wand-magic-sparkles", title: "Photo Retouching", desc: "High-end editing." }
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"
];

const Landing = ({ user, onLogout, onLoginClick, onShopClick }) => {
  // 1. Setup Form State using one Object
  const [formData, setFormData] = useState({
    cName: '',
    cEmail: '',
    cSubject: '',
    cMessage: ''
  });

  // 2. Handle Inputs
  const handleContactChange = (e) => {
    // Keep existing data (...formData) and update only the changed field
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // 3. Handle Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent! We will contact you at ${formData.cEmail}`);
    // Reset Form
    setFormData({ cName: '', cEmail: '', cSubject: '', cMessage: '' });
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand text-uppercase fw-bold" href="#">
            <i className="fas fa-camera-retro me-2 text-gold"></i>E-Imagination 
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {['Home', 'About', 'Services', 'Portfolio'].map((item) => (
                <li className="nav-item" key={item}>
                  <a className="nav-link" href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
              
              <li className="nav-item">
                <button 
                  className="nav-link bg-transparent border-0 text-uppercase"
                  style={{ cursor: 'pointer', fontWeight: 500 }}
                  onClick={onShopClick}
                >
                  Rentals
                </button>
              </li>

              <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
              </li>
              
              {user ? (
                 <>
                   <li className="nav-item ms-lg-3">
                     <span className="nav-link text-gold fw-bold text-uppercase" style={{cursor: 'default'}}>Hi, {user}</span>
                   </li>
                   <li className="nav-item ms-2">
                     <button 
                       className="btn btn-outline-light btn-sm px-4 rounded-pill text-uppercase fw-bold"
                       onClick={onLogout}
                     >
                       Logout
                     </button>
                   </li>
                 </>
              ) : (
                 <li className="nav-item ms-lg-3">
                   <button 
                     className="btn btn-primary btn-sm px-4 rounded-pill text-uppercase fw-bold"
                     onClick={onLoginClick}
                   >
                     Login
                   </button>
                 </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-2 fw-bold mb-4">Capture the Moment</h1>
          <p className="lead mb-5 opacity-75">Professional photography services for weddings, portraits, and events.</p>
          <a href="#portfolio" className="btn btn-primary btn-lg text-uppercase fw-bold px-5 rounded-pill">View Our Work</a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800" className="img-fluid rounded shadow" alt="About" />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h6 className="text-gold fw-bold text-uppercase mb-3">About Me</h6>
              <h2 className="mb-4">Visual Storyteller & Editor</h2>
              <p className="text-muted">I strive to capture raw emotion in every frame.</p>
              <button className="btn btn-dark rounded-pill px-4 mt-3 text-uppercase fw-bold">Get in Touch</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-gold fw-bold text-uppercase">Expertise</h6>
            <h2>My Services</h2>
          </div>
          <div className="row g-4">
            {servicesData.map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="card service-card p-4 text-center">
                  <div className="mb-3 text-gold"><i className={`${s.icon} fa-3x`}></i></div>
                  <h4>{s.title}</h4>
                  <p className="text-muted small">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
        <div className="container">
          <h2 className="text-center mb-5">Our Latest Works</h2>
          <div className="row g-3">
            {portfolioImages.map((img, i) => (
              <div className="col-md-4 col-6" key={i}>
                <img src={img} className="gallery-img rounded" alt="Gallery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-gold fw-bold text-uppercase">Get In Touch</h6>
            <h2>Contact Us</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-white p-3 rounded-circle shadow-sm text-gold me-3">
                  <i className="fas fa-envelope fa-lg"></i>
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0 text-muted small">helloluminalens@gmail.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-white p-3 rounded-circle shadow-sm text-gold me-3">
                  <i className="fas fa-map-marker-alt fa-lg"></i>
                </div>
                <div>
                  <h5 className="mb-1">Location</h5>
                  <p className="mb-0 text-muted small">Kalinga Studios, Bhubaneswar, India</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form className="bg-white p-4 shadow-sm rounded" onSubmit={handleContactSubmit}>
                <FormInput 
                   label="Your Name" type="text" name="cName" value={formData.cName}
                   onChange={handleContactChange} placeholder="John Doe" required={true}
                />
                <FormInput 
                   label="Your Email" type="email" name="cEmail" value={formData.cEmail}
                   onChange={handleContactChange} placeholder="you@example.com" required={true}
                />
                <FormInput 
                   label="Subject" type="text" name="cSubject" value={formData.cSubject}
                   onChange={handleContactChange} placeholder="Inquiry" required={true}
                />
                <div className="mb-3">
                  <label className="form-label small fw-bold">Message</label>
                  <textarea 
                    className="form-control" rows="5" name="cMessage" value={formData.cMessage}
                    onChange={handleContactChange} required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 text-uppercase fw-bold">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-5 bg-black text-center text-white-50">
        <p>&copy; 2026 Lumina Lens. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

Landing.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onShopClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.string
};

export default Landing;