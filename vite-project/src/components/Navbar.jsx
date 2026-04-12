import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LayoutDashboard, User, LogOut } from 'lucide-react';

const Navbar = ({ user, onLoginClick, onDashboardClick, onLogout, onProfileClick, onHomeClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const getUserInitials = () => {
    if (!user) return '';
    const name = typeof user === 'string' ? user : user.name || '';
    return name.charAt(0).toUpperCase();
  };

  // FIX: Differentiates between scrolling and changing views
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    
    if (onHomeClick) {
      onHomeClick(); // If on Profile, jump back to Home view
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' }); // If on Landing, just scroll
    }
  };

  return (
    <>
      <nav className={`lp-navbar${scrolled ? ' scrolled' : ''}`} id="lp-navbar">
        <a
          href="#home"
          className="lp-navbar__brand"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          E-Imagination
        </a>

        <ul className="lp-navbar__links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="lp-navbar__link"
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="lp-navbar__auth" style={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <div className="lp-navbar__avatar-wrapper" ref={dropdownRef}>
              <div
                className="lp-navbar__avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                role="button"
                tabIndex={0}
              >
                {getUserInitials()}
              </div>

              <div className={`lp-navbar__dropdown${dropdownOpen ? ' open' : ''}`}>
                <button
                  className="lp-navbar__dropdown-item"
                  onClick={() => { setDropdownOpen(false); onDashboardClick && onDashboardClick(); }}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </button>
                <button
                  className="lp-navbar__dropdown-item"
                  onClick={() => { setDropdownOpen(false); onProfileClick && onProfileClick(); }}
                >
                  <User size={16} />
                  Profile
                </button>
                <button
                  className="lp-navbar__dropdown-item logout"
                  onClick={() => { setDropdownOpen(false); onLogout && onLogout(); }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className="lp-navbar__login-btn"
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
        </div>

        <button
          className="lp-navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`lp-navbar__mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="lp-navbar__link"
            onClick={(e) => handleNavClick(e, href)}
          >
            {label}
          </a>
        ))}
        {user ? (
          <>
            <button
              className="lp-navbar__dropdown-item"
              onClick={() => { setMobileOpen(false); onDashboardClick && onDashboardClick(); }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
            <button
              className="lp-navbar__dropdown-item"
              onClick={() => { setMobileOpen(false); onProfileClick && onProfileClick(); }}
            >
              <User size={16} />
              Profile
            </button>
            <button
              className="lp-navbar__dropdown-item logout"
              onClick={() => { setMobileOpen(false); onLogout && onLogout(); }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <button
            className="lp-navbar__login-btn"
            onClick={() => { setMobileOpen(false); onLoginClick(); }}
            style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
};

Navbar.propTypes = {
  user: PropTypes.any,
  onLoginClick: PropTypes.func.isRequired,
  onDashboardClick: PropTypes.func,
  onLogout: PropTypes.func,
  onProfileClick: PropTypes.func,
  onHomeClick: PropTypes.func,
};

export default Navbar;