import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Mail, MapPin, ExternalLink, Check, Send,
  Instagram, Facebook, Twitter, Camera, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/landing.css';
import BookingWizard from '../components/BookingWizard';

/* ===== TEAM DATA (3 members per spec) ===== */
const teamData = [
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    name: 'Vikram Das',
    role: 'Event Photography',
  },
  {
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    name: 'Rohit Sharma',
    role: 'Wedding Photography',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    name: 'Neha Patel',
    role: 'Fashion Photography',
  },
];

/* ===== MARQUEE ITEMS ===== */
const marqueeItems = [
  'SONY', 'CANON LENS EF 40mm', 'CANON LENS EF-S 24mm',
  'CANON LENS EF 50mm', 'NIKON Z9', 'SIGMA ART 35mm',
  'SONY GM 24-70mm', 'FUJIFILM X-T5',
];

/* ===== RIPPLE HELPER ===== */
const createRipple = (e) => {
  const button = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  const existing = button.querySelector('.ripple');
  if (existing) existing.remove();
  button.appendChild(circle);
};

const Landing = ({ user, onLogout, onLoginClick, onShopClick, onDashboardClick, onProfileClick }) => {
  /* ─── STATE ─── */
  const [formData, setFormData] = useState({ cName: '', cEmail: '', cMessage: '' });
  const [storyOpen, setStoryOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  /* ─── BOOKING WIZARD STATE ─── */
  const [wizardOpen, setWizardOpen] = useState(false);
  const [preSelectedPkg, setPreSelectedPkg] = useState('prestige');

  /* ─── REFS for scroll reveal ─── */
  const revealRefs = useRef([]);

  const addRevealRef = useCallback((el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  /* ─── SCROLL REVEAL (IntersectionObserver) ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─── HANDLERS ─── */
  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setToastVisible(true);
        setFormData({ cName: '', cEmail: '', cMessage: '' });
        setTimeout(() => setToastVisible(false), 3500);
      } else {
        alert(data.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleNewsletter = () => {
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
  };

  const handleServiceClick = (serviceName) => {
    setFormData(prev => ({
      ...prev,
      cMessage: `Hi E-imagination team,\n\nI am interested in booking a ${serviceName} session. Could you provide more details regarding packages and availability?`
    }));

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const msgInput = document.getElementById('contact-message');
        if (msgInput) msgInput.focus();
      }, 600);
    }
  };

  const handleBookPackage = (pkgId) => {
    if (!user) {
      // Prompt login if not logged in
      onLoginClick();
    } else {
      // Open wizard if logged in
      setPreSelectedPkg(pkgId);
      setWizardOpen(true);
    }
  };

  return (
    <div className="landing-root">

      {/* ── NAVBAR ─── */}
      <Navbar
        user={user}
        onLoginClick={onLoginClick}
        onDashboardClick={onDashboardClick}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section id="home" className="lp-hero">
        <div className="lp-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=85"
            alt="Photography studio with cinematic lighting"
            fetchPriority="high"
          />
        </div>

        <div className="lp-hero__content">
          <p className="lp-hero__subtitle">Photography Studio</p>

          <h1 className="lp-hero__headline">
            Capture Your
            <span>Perfect Moments.</span>
          </h1>

          <p className="lp-hero__description">
            We specialize in turning fleeting moments into timeless memories.
            From intimate portraits to grand celebrations, our lens captures
            the essence of every story worth telling.
          </p>

          <div className="lp-hero__ctas">
            <button
              className="lp-btn-gold"
              onClick={(e) => {
                createRipple(e);
                const el = document.querySelector('#pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Camera size={18} />
              Book a Shoot
            </button>
            <button
              className="lp-btn-ghost"
              onClick={(e) => {
                createRipple(e);
                onShopClick && onShopClick();
              }}
            >
              Browse Gear
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="lp-marquee">
          <div className="lp-marquee__track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span className="lp-marquee__item" key={i}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ("Who We Are") ──────────────────────────── */}
      <section id="about" className="lp-section lp-section--alt">
        <div className="lp-about" ref={addRevealRef}>
          <div className="lp-about__image-wrapper lp-reveal" ref={addRevealRef}>
            <img
              className="lp-about__image"
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80"
              alt="Photographer capturing the perfect shot"
              loading="lazy"
            />
          </div>

          <div className="lp-about__text lp-reveal" ref={addRevealRef}>
            <span className="lp-section__label">Who We Are</span>
            <h2 className="lp-section__title">
              We Tell Stories Through The Lens
            </h2>
            <p className="lp-about__description">
              Founded in 2020, our studio has been dedicated to capturing the
              essence of life's most beautiful moments. We believe that every
              picture tells a story, and we are here to help you write yours.
              With a team of passionate artists and state-of-the-art equipment,
              we deliver memories that last a lifetime.
            </p>

            <div className="lp-about__stats">
              <div>
                <div className="lp-about__stat-number">150+</div>
                <div className="lp-about__stat-label">Weddings Shot</div>
              </div>
              <div>
                <div className="lp-about__stat-number">500+</div>
                <div className="lp-about__stat-label">Happy Clients</div>
              </div>
            </div>

            <div>
              <button
                className="lp-btn-story"
                onClick={(e) => { createRipple(e); setStoryOpen(true); }}
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDE-OVER MODAL ("Our Journey") ──────────────────────── */}
      <div
        className={`lp-slideover-overlay${storyOpen ? ' open' : ''}`}
        onClick={() => setStoryOpen(false)}
      />
      <div className={`lp-slideover${storyOpen ? ' open' : ''}`}>
        <div className="lp-slideover__header">
          <h3 className="lp-slideover__title">Our Journey</h3>
          <button
            className="lp-slideover__close"
            onClick={() => setStoryOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="lp-slideover__body">
          <p>
            It all began in a small studio apartment in Bhubaneswar, with
            nothing more than a borrowed camera and a dream. In 2020, amidst
            uncertainty, we saw an opportunity to tell stories that mattered —
            stories of love, celebration, and the quiet beauty of everyday life.
          </p>
          <p>
            What started as a passion project quickly grew into something
            extraordinary. Our first wedding shoot was for a childhood friend,
            and the joy we captured in those frames became our calling card.
            Word spread, and soon we were documenting love stories across the
            country.
          </p>
          <p>
            Today, E-imagination is more than a photography studio. We are a
            collective of artists, storytellers, and dreamers. With over 150
            weddings and 500+ happy clients, we've learned that the most
            powerful photographs are the ones that make you feel something —
            long after the moment has passed.
          </p>
          <p>
            We invest in the finest equipment — from Sony Alpha bodies to Canon
            L-series lenses — because your memories deserve nothing less than
            perfection. Every frame we capture is a promise: that this moment
            will live forever.
          </p>
          <div className="lp-slideover__signature">
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.2rem',
              color: '#C5A059',
              fontStyle: 'italic',
              marginBottom: '0.25rem'
            }}>
              — The E-imagination Team
            </p>
            <p style={{
              fontSize: '0.78rem',
              color: 'rgba(245,245,247,0.35)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Est. 2020 · Bhubaneswar
            </p>
          </div>
        </div>
      </div>

      {/* ── TEAM SECTION ──────────────────────────────────────────── */}
      <section id="portfolio" className="lp-section">
        <div className="lp-team">
          <div className="lp-reveal" ref={addRevealRef} style={{ marginBottom: '1rem' }}>
            <span className="lp-section__label" style={{ justifyContent: 'center' }}>
              Meet The Artists
            </span>
            <h2 className="lp-section__title" style={{ textAlign: 'center' }}>
              Our Expert Team
            </h2>
          </div>

          <div className="lp-team__grid">
            {teamData.map((member, index) => (
              <div
                className="lp-team__card lp-reveal"
                key={member.name}
                ref={addRevealRef}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <img
                  className="lp-team__card-image"
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="lp-team__card-overlay">
                  <h3 className="lp-team__card-name">{member.name}</h3>
                  <p className="lp-team__card-role">{member.role}</p>
                </div>
                <button className="lp-team__card-cta" onClick={(e) => createRipple(e)}>
                  View Portfolio
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING & BOOKING WIZARD TRIGGER ──────────────────────────── */}
      {/* ── PRICING & BOOKING WIZARD TRIGGER ──────────────────────────── */}
      <section id="pricing" className="lp-section lp-section--alt">
        <div className="lp-team">
          <div className="lp-reveal" ref={addRevealRef} style={{ marginBottom: '3rem' }}>
            <span className="lp-section__label" style={{ justifyContent: 'center' }}>Services</span>
            <h2 className="lp-section__title" style={{ textAlign: 'center' }}>Choose Your Experience</h2>
            {/* FIX: Removed text-muted, added inline color */}
            <p className="text-center mx-auto" style={{ maxWidth: '600px', color: '#A0A0A0' }}>Log in to secure your date directly through our portal.</p>
          </div>

          <div className="lp-team__grid text-start">
            {/* Package 1 */}
            <div className="lp-team__card lp-reveal p-4 d-flex flex-column" ref={addRevealRef} style={{ background: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', cursor: 'default' }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>The Essential</h4>
              <h2 style={{ color: '#C5A059', margin: '1rem 0' }}>$1,500</h2>
              {/* FIX: Removed text-muted, added inline color */}
              <p className="small flex-grow-1 mb-4" style={{ color: '#A0A0A0', lineHeight: '1.6' }}>Perfect for intimate portraits and small events.</p>
              <button className="lp-btn-ghost w-100" onClick={(e) => { createRipple(e); handleBookPackage('essential'); }}>Book Session</button>
            </div>

            {/* Package 2 */}
            <div className="lp-team__card lp-reveal p-4 d-flex flex-column" ref={addRevealRef} style={{ background: '#242426', border: '1px solid #C5A059', cursor: 'default' }}>
              <div className="text-center mb-3"><span style={{ backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#C5A059', letterSpacing: '1px', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>MOST POPULAR</span></div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>The Prestige</h4>
              <h2 style={{ color: '#C5A059', margin: '1rem 0' }}>$3,500</h2>
              {/* FIX: Removed text-muted, added inline color */}
              <p className="small flex-grow-1 mb-4" style={{ color: '#A0A0A0', lineHeight: '1.6' }}>Our most popular choice for weddings and large events.</p>
              <button className="lp-btn-gold w-100" onClick={(e) => { createRipple(e); handleBookPackage('prestige'); }}>Book Session</button>
            </div>

            {/* Package 3 */}
            <div className="lp-team__card lp-reveal p-4 d-flex flex-column" ref={addRevealRef} style={{ background: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', cursor: 'default' }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>The Couture</h4>
              <h2 style={{ color: '#C5A059', margin: '1rem 0' }}>$6,000</h2>
              {/* FIX: Removed text-muted, added inline color */}
              <p className="small flex-grow-1 mb-4" style={{ color: '#A0A0A0', lineHeight: '1.6' }}>The ultimate luxury experience for high-end productions.</p>
              <button className="lp-btn-ghost w-100" onClick={(e) => { createRipple(e); handleBookPackage('couture'); }}>Book Session</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ───────────────────────────────────────── */}
      <section id="contact" className="lp-section">
        <div className="lp-contact">
          <div className="lp-reveal" ref={addRevealRef} style={{ marginBottom: '3rem' }}>
            <span className="lp-section__label">Get In Touch</span>
            <h2 className="lp-section__title">Contact Us</h2>
          </div>

          <div className="lp-contact__grid">
            {/* Left — Contact info */}
            <div className="lp-contact__info lp-reveal" ref={addRevealRef}>
              <div className="lp-contact__info-item">
                <div className="lp-contact__info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="lp-contact__info-label">Email</div>
                  <a
                    href="mailto:elmagination@studio.com"
                    className="lp-contact__info-value"
                  >
                    elmagination@studio.com
                  </a>
                </div>
              </div>

              <div className="lp-contact__info-item">
                <div className="lp-contact__info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="lp-contact__info-label">Location</div>
                  <div className="lp-contact__info-value">
                    Kalinga Studios, Bhubaneswar
                    <a
                      href="https://maps.google.com/?q=Kalinga+Studios+Bhubaneswar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lp-contact__info-maps"
                      aria-label="View on Maps"
                      title="View on Maps"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <form
              className="lp-contact__form lp-reveal"
              ref={addRevealRef}
              onSubmit={handleContactSubmit}
            >
              <div className="lp-floating-group">
                <input
                  type="text"
                  name="cName"
                  id="contact-name"
                  placeholder=" "
                  value={formData.cName}
                  onChange={handleContactChange}
                  required
                />
                <label htmlFor="contact-name">Name</label>
              </div>

              <div className="lp-floating-group">
                <input
                  type="email"
                  name="cEmail"
                  id="contact-email"
                  placeholder=" "
                  value={formData.cEmail}
                  onChange={handleContactChange}
                  required
                />
                <label htmlFor="contact-email">Email</label>
              </div>

              <div className="lp-floating-group">
                <textarea
                  name="cMessage"
                  id="contact-message"
                  placeholder=" "
                  value={formData.cMessage}
                  onChange={handleContactChange}
                  required
                />
                <label htmlFor="contact-message">Message</label>
              </div>

              <button
                type="submit"
                className="lp-contact__submit"
                onClick={createRipple}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} />
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── TOAST NOTIFICATION ─────────────────────────────────── */}
      <div className={`lp-toast${toastVisible ? ' show' : ''}`}>
        <div className="lp-toast__icon">
          <Check size={16} />
        </div>
        Message Sent Successfully!
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer__grid">
          <div>
            <div className="lp-footer__brand">E-imagination</div>
            <p className="lp-footer__brand-text">
              Capturing moments that last a lifetime. Professional photography
              for all occasions — weddings, events, portraits, and fashion.
            </p>
            <div className="lp-footer__socials">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="lp-footer__social-icon"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="lp-footer__social-icon"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="lp-footer__social-icon"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="lp-footer__heading">Query For</h4>
            <ul className="lp-footer__links">
              {[
                'Wedding Photography',
                'Event Photography',
                'Fashion Photography',
                'Portrait Photography'
              ].map((service) => (
                <li key={service}>
                  <button
                    className="lp-footer__link"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="lp-footer__heading">Quick Links</h4>
            <ul className="lp-footer__links">
              {[
                ['Home', '#home'],
                ['About', '#about'],
                ['Portfolio', '#portfolio'],
                ['Pricing', '#pricing'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="lp-footer__link">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="lp-footer__heading">Newsletter</h4>
            <p className="lp-footer__newsletter-text">
              Subscribe for exclusive updates, behind-the-scenes content, and special offers.
            </p>

            {!newsletterDone ? (
              <div className="lp-footer__newsletter-form">
                <input
                  type="email"
                  className="lp-footer__newsletter-input"
                  placeholder="Email Address"
                  aria-label="Email address for newsletter"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button
                  className="lp-footer__newsletter-btn"
                  type="button"
                  onClick={handleNewsletter}
                >
                  Go
                </button>
              </div>
            ) : (
              <div className="lp-footer__newsletter-success">
                <div className="lp-footer__newsletter-check">
                  <Check size={14} />
                </div>
                <p className="lp-footer__newsletter-msg">
                  Welcome to the family! Check your mail for a 10% discount code.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lp-footer__bottom">
          <p className="lp-footer__copyright">
            © 2026 Studio Inc. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Render the Wizard */}
      <BookingWizard
        show={wizardOpen}
        onHide={() => setWizardOpen(false)}
        initialPackage={preSelectedPkg}
      />

    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.string,
  onLoginClick: PropTypes.func.isRequired,
  onDashboardClick: PropTypes.func,
  onLogout: PropTypes.func.isRequired,
  onShopClick: PropTypes.func,
  onProfileClick: PropTypes.func,
};

export default Landing;