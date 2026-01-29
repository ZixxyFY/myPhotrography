import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Data Arrays
const servicesData = [
  { icon: "fas fa-camera", title: "Portrait Photography", desc: "Professional headshots, family portraits, and creative modeling shoots." },
  { icon: "fas fa-heart", title: "Wedding & Events", desc: "Full-day coverage for your special day. Capturing candid moments." },
  { icon: "fas fa-wand-magic-sparkles", title: "Photo Retouching", desc: "High-end editing and color grading to bring out the best in every image." }
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"
];

class Landing extends Component {
  render() {
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand text-uppercase fw-bold" href="#">
              <i className="fas fa-camera-retro me-2 text-gold"></i>E-Imagination 
            </a>
            <div className="collapse navbar-collapse show" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                  <li className="nav-item" key={item}>
                    <a className="nav-link" href={`#${item.toLowerCase()}`}>{item}</a>
                  </li>
                ))}
                <li className="nav-item ms-lg-3">
                  <button 
                    className="btn btn-primary btn-sm px-4 rounded-pill"
                    onClick={this.props.onLoginClick}
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header id="home" className="hero-section text-center text-white">
          <div className="container">
            <h1 className="display-2 fw-bold mb-4">Capture the Moment</h1>
            <p className="lead mb-5 opacity-75">Professional photography services for weddings, portraits, and events.</p>
            <a href="#portfolio" className="btn btn-primary btn-lg">View Our Work</a>
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
                <button className="btn btn-dark rounded-pill px-4 mt-3">Get in Touch</button>
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

        {/* --- START OF NEW CONTACT SECTION --- */}
        <section id="contact" className="section-padding bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h6 className="text-gold fw-bold text-uppercase">Get In Touch</h6>
              <h2>Contact Us</h2>
            </div>

            <div className="row justify-content-center">
              {/* Contact Info Column */}
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

                <div className="d-flex align-items-center mb-4">
                  <div className="bg-white p-3 rounded-circle shadow-sm text-gold me-3">
                    <i className="fas fa-phone fa-lg"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Phone</h5>
                    <p className="mb-0 text-muted small">+91 86867 67656</p>
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

              {/* Contact Form Column */}
              <div className="col-lg-6">
                <form className="bg-white p-4 shadow-sm rounded">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="form-control" placeholder="Your Email" />
                    </div>
                    <div className="col-12">
                      <input type="text" className="form-control" placeholder="Subject" />
                    </div>
                    <div className="col-12">
                      <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* --- END OF NEW CONTACT SECTION --- */}

        {/* Footer */}
        <footer className="py-5 bg-black text-center text-white-50">
          <p>&copy; 2026 Lumina Lens. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}
Landing.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};
export default Landing;