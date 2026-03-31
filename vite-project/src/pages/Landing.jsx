import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
// import FormInput from '../components/FormInput';

/* ===== PORTFOLIO / TEAM DATA ===== */
const portfolioData = [
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rohit Sharma",
    role: "Wedding Photographer",
    phone: "+91 98765 43210",
    instagram: "#",
    facebook: "#",
    twitter: "#"
  },
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Ananya Singh",
    role: "Portrait Photographer",
    phone: "+91 91234 56789",
    instagram: "#",
    facebook: "#",
    twitter: "#"
  },
  {
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Vikram Das",
    role: "Event Photographer",
    phone: "+91 99887 66554",
    instagram: "#",
    facebook: "#",
    twitter: "#"
  },
  {
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Neha Patel",
    role: "Fashion Photographer",
    phone: "+91 90909 12121",
    instagram: "#",
    facebook: "#",
    twitter: "#"
  }
];

const Landing = ({ user, onLoginClick, onDashboardClick }) => {
  const [formData, setFormData] = useState({
    cName: '', cEmail: '', cSubject: '', cMessage: ''
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Slideshow Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % portfolioData.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

 const handleContactSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cName: formData.cName,
        cEmail: formData.cEmail,
        cMessage: formData.cMessage
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({
        cName: '',
        cEmail: '',
        cSubject: '',
        cMessage: ''
      });
    } else {
      alert(data.message || 'Failed to send message');
    }

  } catch (error) {
    console.error('Error sending contact form:', error);
    alert('Server error. Please try again later.');
  }
};

  // Custom Styles for the specific design elements
  const styles = {
    yellowBar: {
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '80px',
      backgroundColor: '#FFC107',
      zIndex: 1000,
      display: 'none' // Hidden on mobile, shown on desktop via media query logic usually, but handled inline below
    },
    mainContent: {
      marginLeft: '0px', // Adjusted for mobile first
      backgroundColor: '#101010',
      minHeight: '100vh',
      color: 'white',
      overflowX: 'hidden'
    },
    cornerBracket: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      borderColor: '#777',
      borderStyle: 'solid',
      transition: 'all 0.3s'
    },
    circleBg: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '500px',
      border: '2px dashed rgba(255,255,255,0.1)',
      borderRadius: '50%',
      zIndex: 0
    }
  };

  return (
    <div className="d-flex">
      {/* 1. Left Yellow Sidebar (Visible on large screens) */}
      <div className="d-none d-lg-block" style={{...styles.yellowBar, width: '80px'}}></div>

      {/* 2. Main Content Wrapper */}
      <div style={{...styles.mainContent, width: '100%'}} className="flex-grow-1 ps-lg-5">
        
        {/* Navbar */}
        <Navbar user={user} onLoginClick={onLoginClick} onDashboardClick={onDashboardClick} />

        {/* Hero Section */}
        <header id="home" className="container-fluid py-5 d-flex align-items-center" style={{minHeight: '85vh', position: 'relative'}}>
           <div className="row w-100 align-items-center">
             
             {/* Left Text Content */}
             <div className="col-lg-6 ps-lg-5 mb-5 mb-lg-0" style={{zIndex: 2}}>
                <h6 className="text-warning text-uppercase mb-3" style={{letterSpacing: '3px', fontSize: '0.9rem'}}>Photography Studio</h6>
                
                <div className="position-relative mb-4 p-2">
                  {/* Top Left Bracket */}
                  <span style={{...styles.cornerBracket, borderTopWidth: '1px', borderLeftWidth: '1px', top: 0, left: 0}}></span>
                  
                  <h1 className="display-3 fw-bold text-white mb-0" style={{lineHeight: '1.1'}}>Capture Your</h1>
                  <h1 className="display-3 fw-bold text-warning mb-0" style={{lineHeight: '1.1'}}>Perfect Moments.</h1>
                  
                  {/* Bottom Right Bracket */}
                  <span style={{...styles.cornerBracket, borderBottomWidth: '1px', borderRightWidth: '1px', bottom: 0, right: '20%'}}></span>
                </div>
             </div>

             {/* Right Image Content */}
             <div className="col-lg-6 position-relative text-center">
                {/* Background Concentric Circles Effect */}
                <div style={{...styles.circleBg, width: '400px', height: '400px', opacity: 0.3}}></div>
                <div style={{...styles.circleBg, width: '550px', height: '550px', opacity: 0.2}}></div>
                <div style={{...styles.circleBg, width: '700px', height: '700px', opacity: 0.1, borderStyle: 'solid'}}></div>
                
                {/* Main Image */}
                <img 
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" 
                  alt="Hands holding camera" 
                  className="img-fluid position-relative"
                  style={{zIndex: 1, maxHeight: '550px', transform: 'scale(1.1)'}} 
                />
             </div>
           </div>
        </header>

        {/* About Section */}
        <section id="about" className="section-padding py-5" style={{backgroundColor: '#151515'}}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-4 mb-5 mb-lg-0 position-relative">
                {/* Decorative border frame */}
                <div style={{position: 'absolute', top: '-20px', left: '-20px', width: '100%', height: '100%', border: '2px solid #333', zIndex: 0}}></div>
                <img 
                  src="https://unsplash.com/photos/54fAtCSq6gQ/download" 
                  className="img-fluid position-relative shadow-lg" 
                  alt="Person holding black and grey pentax camera"
                  style={{zIndex: 1}}
                />
              </div>
              <div className="col-lg-6 ps-lg-5">
                <h6 className="text-warning fw-bold text-uppercase mb-3" style={{letterSpacing: '2px'}}>Who We Are</h6>
                <h2 className="display-5 fw-bold text-white mb-4">We Tell Stories Through The Lens</h2>
                <p className="text-white-50 lead mb-4">
                  Founded in 2020, our studio has been dedicated to capturing the essence of life's most beautiful moments. We believe that every picture tells a story, and we are here to help you write yours.
                </p>
                <div className="row mb-4">
                  <div className="col-6">
                    <h2 className="text-warning fw-bold">150+</h2>
                    <p className="text-white-50 small">Weddings Shot</p>
                  </div>
                  <div className="col-6">
                    <h2 className="text-warning fw-bold">500+</h2>
                    <p className="text-white-50 small">Happy Clients</p>
                  </div>
                </div>
                <button className="btn btn-outline-warning rounded-0 px-4 py-2 text-uppercase fw-bold">Read Our Story</button>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="section-padding overflow-hidden py-5 mb-5" style={{background: '#1a1a1a'}}>
          <div className="container text-center">
            <h2 className="mb-5 text-white">Our Expert Team</h2>
            
            {/* UPDATED HEIGHT to 600px to prevent overlap with Contact section */}
            <div className="position-relative d-flex justify-content-center align-items-center" style={{ height: "600px" }}>
              {portfolioData.map((item, index) => {
                const total = portfolioData.length;
                const isCenter = index === activeIndex;
                const isLeft = index === (activeIndex - 1 + total) % total;
                const isRight = index === (activeIndex + 1) % total;
                
                let translateX = 0;
                let scale = 0.6;
                let opacity = 0.4;
                let zIndex = 1;
                
                if (isCenter) { scale = 1; opacity = 1; zIndex = 10; } 
                else if (isLeft) { translateX = -300; zIndex = 5; } 
                else if (isRight) { translateX = 300; zIndex = 5; } 
                else { opacity = 0; }
                
                if (opacity === 0) return null;
                
                return (
                  <div key={index} className="card shadow border-0 bg-dark" style={{ position: "absolute", width: "280px", transform: `translateX(${translateX}px) scale(${scale})`, transition: "all 0.6s ease", opacity, zIndex }}>
                    <img src={item.img} alt={item.name} className="card-img-top" style={{ height: "250px", objectFit: "cover", opacity: 0.9 }} />
                    <div className="card-body text-white border-top border-secondary">
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        <p className="text-warning small fw-bold mb-2">{item.role}</p>
                        <p className="small text-muted mb-3"><i className="fas fa-phone-alt me-1"></i>{item.phone}</p>
                        
                        <div className="d-flex justify-content-center gap-3">
                            <a href={item.facebook} className="text-white-50" style={{ transition: 'color 0.3s' }}><i className="fab fa-facebook-f"></i></a>
                            <a href={item.instagram} className="text-white-50" style={{ transition: 'color 0.3s' }}><i className="fab fa-instagram"></i></a>
                            <a href={item.twitter} className="text-white-50" style={{ transition: 'color 0.3s' }}><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding py-5" style={{backgroundColor: '#101010'}}>
          <div className="container">
            <div className="text-center mb-5">
              <h6 className="text-warning fw-bold text-uppercase">Get In Touch</h6>
              <h2 className="text-white">Contact Us</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark border border-secondary p-3 rounded-circle shadow-sm text-warning me-3"><i className="fas fa-envelope fa-lg"></i></div>
                  <div><h5 className="mb-1 text-white">Email</h5><p className="mb-0 text-white-50 small">eImagination@studio.com</p></div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-dark border border-secondary p-3 rounded-circle shadow-sm text-warning me-3"><i className="fas fa-map-marker-alt fa-lg"></i></div>
                  <div><h5 className="mb-1 text-white">Location</h5><p className="mb-0 text-white-50 small">Kaling Studios, Bhubaneswar</p></div>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="bg-dark p-4 shadow-sm border border-secondary rounded" onSubmit={handleContactSubmit}>
                  {/* Note: Ensure FormInput accepts style/className for dark mode, defaulting here to bootstrap classes for inputs */}
                  <div className="mb-3">
                      <label className="text-white-50 small">Name</label>
                      <input type="text" name="cName" className="form-control bg-black text-white border-secondary" value={formData.cName} onChange={handleContactChange} />
                  </div>
                  <div className="mb-3">
                      <label className="text-white-50 small">Email</label>
                      <input type="email" name="cEmail" className="form-control bg-black text-white border-secondary" value={formData.cEmail} onChange={handleContactChange} />
                  </div>
                  <div className="mb-3">
                      <label className="text-white-50 small">Message</label>
                      <textarea className="form-control bg-black text-white border-secondary" rows="4" name="cMessage" value={formData.cMessage} onChange={handleContactChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-warning w-100 text-uppercase fw-bold">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-5 pb-4" style={{ backgroundColor: '#000', borderTop: '1px solid #222' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-5 mb-lg-0">
                 <h3 className="fw-normal mb-4 text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
                   STUDIO
                 </h3>
                 <p className="text-white-50 small mb-4" style={{ maxWidth: '350px', lineHeight: '1.8' }}>
                   Capturing moments that last a lifetime. Professional photography for all occasions.
                 </p>
                 <div className="d-flex gap-4">
                   <a href="#" className="text-white-50"><i className="fab fa-instagram fa-lg"></i></a>
                   <a href="#" className="text-white-50"><i className="fab fa-facebook-f fa-lg"></i></a>
                   <a href="#" className="text-white-50"><i className="fab fa-twitter fa-lg"></i></a>
                 </div>
              </div>
              <div className="col-lg-3 col-6">
                <h6 className="text-white fw-bold mb-4 small">Quick Links</h6>
                <ul className="list-unstyled small text-white-50 d-grid gap-3">
                  <li><a href="#home" className="text-white-50 text-decoration-none">Home</a></li>
                  <li><a href="#about" className="text-white-50 text-decoration-none">About</a></li>
                  <li><a href="#portfolio" className="text-white-50 text-decoration-none">Portfolio</a></li>
                  <li><a href="#contact" className="text-white-50 text-decoration-none">Contact</a></li>
                </ul>
              </div>
              <div className="col-lg-4 col-6">
                 <h6 className="text-white fw-bold mb-4 small">Newsletter</h6>
                 <p className="text-white-50 small">Subscribe for latest updates and offers.</p>
                 <div className="input-group mb-3">
                   <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Email Address" />
                   <button className="btn btn-warning" type="button">Go</button>
                 </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-top border-secondary">
               <small className="text-white-50">&copy; 2026 Studio Inc. All Rights Reserved.</small>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.string,
  onLoginClick: PropTypes.func.isRequired,
  onDashboardClick: PropTypes.func
};

export default Landing;