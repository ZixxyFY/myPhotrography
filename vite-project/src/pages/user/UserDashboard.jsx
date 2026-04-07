import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookPhotographer from './BookPhotographer';
import EquipmentRental from './EquipmentRental';
import MyBookings from './MyBookings';
import Profile from './Profile';
import { Collapse } from 'react-bootstrap';
import { 
  LayoutDashboard, ShoppingCart, Camera, Users, Package, Calendar, 
  Image as ImageIcon, CreditCard, Settings, ChevronDown, 
  ChevronRight, LogOut, Bell, Menu
} from 'lucide-react';

// --- MOCK DATABASE ---
const db = {
  stats: [
    { label: "Upcoming Shoots", value: "2", icon: "fa-calendar-check", color: "primary" },
    { label: "Active Rentals", value: "3", icon: "fa-camera", color: "warning" }
  ],
  upcoming: {
    id: 101,
    photographer: "Sarah Jenkins",
    type: "Wedding Portfolio",
    date: "Oct 24, 2026",
    time: "10:00 AM - 04:00 PM",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
  },
  activeRentals: [
    { id: 1, item: "Sony A7S III", due: "Tomorrow", daysLeft: 1, totalDays: 7, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=100&q=80" },
    { id: 2, item: "Godox AD200", due: "In 3 Days", daysLeft: 3, totalDays: 5, img: "https://images.unsplash.com/photo-1620311394145-667702484931?auto=format&fit=crop&w=150&q=80" }
  ],
  timeline: [
    { id: 1, title: "Booking Confirmed", desc: "Wedding Shoot w/ Sarah", time: "2h ago", icon: "fa-check-circle", color: "text-success" },
    { id: 2, title: "Equipment Picked Up", desc: "Sony A7S III Kit", time: "Yesterday", icon: "fa-box", color: "text-primary" },
    { id: 3, title: "Album Delivered", desc: "Birthday Bash 2025", time: "3 days ago", icon: "fa-images", color: "text-warning" }
  ],
  deliveredGalleries: [
    { id: 1, name: "Wedding Portfolio", date: "Sep 2026", thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Studio Session", date: "Aug 2026", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" }
  ]
};

// --- CSS STYLES ---
const styles = {
  bg: '#1A1A1B',
  gold: '#C5A059',
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFF'
  },
  fontHeader: { fontFamily: "'Playfair Display', serif" },
  fontBody: { fontFamily: "'Montserrat', sans-serif" }
};

const glassClass = "border-0 shadow-sm rounded-4 h-100 p-4 transition";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick} 
    className={`d-flex align-items-center justify-content-between p-3 mb-1 rounded-3 ${active ? 'fw-bold' : ''}`} 
    style={{
      cursor: 'pointer',
      color: active ? styles.gold : '#888',
      backgroundColor: active ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
      borderLeft: active ? `4px solid ${styles.gold}` : '4px solid transparent',
      transition: 'all 0.2s ease',
      fontFamily: styles.fontBody.fontFamily
    }}
  >
    <div className="d-flex align-items-center gap-3">
      <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
      <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </div>
  </div>
);

// --- MAIN CONTENT ---

const Topbar = ({ user }) => (
  <div className="d-flex justify-content-between align-items-center mb-5" style={{...styles.fontBody, ...styles.glass, padding: '15px 25px', borderRadius: '50px'}}>
    <div className="input-group" style={{maxWidth: '400px'}}>
      <span className="input-group-text bg-transparent border-end-0 border-light text-muted ps-3 rounded-start-pill"><i className="fas fa-search" style={{ color: 'rgba(255,255,255,0.5)' }}></i></span>
      <input type="text" className="form-control border-start-0 border-light bg-transparent text-white rounded-end-pill shadow-none placeholder-light" placeholder="Search photographers, gear..." style={{boxShadow: 'none', color: '#FFF'}} />
    </div>
    
    <div className="d-flex align-items-center gap-4">
      <div className="position-relative cursor-pointer">
        <i className="fas fa-bell fa-lg text-light"></i>
        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-dark rounded-circle"></span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="text-end d-none d-md-block text-light">
          <small className="d-block fw-bold">{user.name}</small>
          <small className="d-block text-muted" style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.6) !important'}}>Premium Member</small>
        </div>
        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 40, height: 40, backgroundColor: styles.gold, color: '#1A1A1B'}}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </div>
  </div>
);

const UserDashboard = ({ user: initialUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState({ name: initialUser || 'Client User' });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Profile Sync
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.fullName) setCurrentUser({ name: parsed.fullName });
        else if (parsed.name) setCurrentUser({ name: parsed.name });
      }
    } catch(e) {
      // Not a json string or missing
      const localUser = localStorage.getItem('user');
      if (localUser && typeof localUser === 'string') setCurrentUser({ name: localUser });
    }
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: Settings, label: 'My Profile' }
  ];

  return (
    <div className="d-flex min-vh-100 ds-layout" style={{ backgroundColor: styles.bg, fontFamily: styles.fontBody.fontFamily }}>
      
      {/* 1. MATCH ADMIN SIDEBAR */}
      <div className="border-end d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto', backgroundColor: '#1A1A1B', borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2 text-white" style={{ letterSpacing: '-0.5px', ...styles.fontHeader }}>
            <Camera size={28} color={styles.gold} /> LensDash
          </h4>
        </div>
        
        <div className="d-flex flex-column px-3 pb-5 gap-1">
          {menuItems.map(item => (
            <SidebarItem key={item.id} icon={item.icon} label={item.label} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
          ))}
          
          <div className="mt-4 border-top pt-3" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
            <div 
              onClick={() => setShowLogoutModal(true)} 
              className="d-flex align-items-center gap-3 p-3 text-white transition hover-scale rounded-3" 
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <LogOut size={20} strokeWidth={1.5} color={styles.gold} />
              <span style={{ fontSize: '0.95rem' }}>Log Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="flex-grow-1 overflow-auto d-flex flex-column" style={{position: 'relative'}}>
        <div className="p-4 p-lg-5 mb-5 mx-auto w-100" style={{ maxWidth: '1400px' }}>
          <Topbar user={currentUser} />

          {activeTab === 'dashboard' && (
            <div className="fade-in">
              <div className="mb-4">
                <h2 className="fw-bold text-white mt-3" style={styles.fontHeader}>Hi, {currentUser.name}!</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your studio management portal.</p>
              </div>

              <div className="row g-4">
                {/* CENTER COLUMN: MAIN COMMAND CENTER */}
                <div className="col-xl-8">
                  {/* STATS */}
                  <div className="row g-4 mb-4">
                    {db.stats.map((stat, idx) => (
                      <div className="col-md-6" key={idx}>
                        <div className={glassClass} style={styles.glass}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="text-uppercase mb-1 small fw-bold" style={{ color: styles.gold, letterSpacing: '1px' }}>{stat.label}</p>
                              <h2 className="fw-bold mb-0 text-white" style={styles.fontBody}>{stat.value}</h2>
                            </div>
                            <div className="p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: styles.gold, width: '60px', height: '60px' }}>
                              <i className={`fas ${stat.icon} fa-xl`}></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* UPCOMING */}
                  <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4" style={styles.glass}>
                    <div className="row g-0 h-100">
                      <div className="col-md-5">
                        <img src={db.upcoming.image} className="img-fluid h-100 w-100" style={{objectFit: 'cover', minHeight: '300px'}} alt="Shoot" />
                      </div>
                      <div className="col-md-7 p-4 p-lg-5 d-flex flex-column justify-content-center">
                        <span className="badge w-auto align-self-start mb-2 px-3 py-2" style={{ backgroundColor: styles.gold, color: '#1A1A1B', letterSpacing: '1px' }}>Upcoming</span>
                        <h3 className="fw-bold text-white mb-2 mt-2" style={styles.fontHeader}>{db.upcoming.type}</h3>
                        <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>with {db.upcoming.photographer}</p>
                        
                        <div className="d-flex gap-4 mb-3 small fw-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          <span><i className="fas fa-calendar me-2" style={{ color: styles.gold }}></i>{db.upcoming.date}</span>
                          <span><i className="fas fa-clock me-2" style={{ color: styles.gold }}></i>{db.upcoming.time}</span>
                        </div>

                        {/* Shoot Roadmap */}
                        <div className="mt-2 mb-4 bg-dark bg-opacity-25 rounded-3 p-3">
                          <small className="text-uppercase fw-bold mb-2 d-block" style={{color: styles.gold}}>Shoot Roadmap</small>
                          <div className="d-flex align-items-center gap-2">
                            <div className="flex-fill">
                               <div className="d-flex justify-content-between mb-2" style={{fontSize: '0.75rem', fontWeight: '500'}}>
                                 <span className="text-white">Concept</span>
                                 <span className="text-white">Scouting</span>
                                 <span style={{color: 'rgba(255,255,255,0.4)'}}>Prep</span>
                               </div>
                               <div className="progress" style={{height: '6px', backgroundColor: 'rgba(255,255,255,0.1)'}}>
                                 <div className="progress-bar" style={{width: '66%', backgroundColor: styles.gold}}></div>
                               </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="d-flex gap-3">
                          <button 
                            className="btn rounded-pill px-4 py-2 transition" 
                            style={{ border: `1px solid ${styles.gold}`, color: styles.gold, backgroundColor: 'transparent', fontWeight: 'bold' }}
                            onMouseOver={(e) => { e.currentTarget.style.color = '#1A1A1B'; e.currentTarget.style.backgroundColor = styles.gold; }}
                            onMouseOut={(e) => { e.currentTarget.style.color = styles.gold; e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >Reschedule</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4">
                    {/* QUICK ACTIONS */}
                    <div className="col-md-6">
                      <div className={glassClass} style={styles.glass}>
                        <h5 className="fw-bold mb-4 text-white" style={styles.fontHeader}>Quick Actions</h5>
                        <div className="d-grid gap-3">
                          <button 
                            className="btn text-start p-3 rounded-3 d-flex align-items-center transition" 
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.05)' }} 
                            onClick={() => alert("Upload feature coming soon!")}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                          >
                            <i className="fas fa-cloud-upload-alt me-3 fa-lg" style={{ color: styles.gold }}></i>
                            <span className="fw-bold" style={styles.fontBody}>Upload Inspiration</span>
                          </button>
                          <button 
                            className="btn text-start p-3 rounded-3 d-flex align-items-center transition" 
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.05)' }} 
                            onClick={() => alert("Support ticket created.")}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                          >
                            <i className="fas fa-headset me-3 fa-lg" style={{ color: styles.gold }}></i>
                            <span className="fw-bold" style={styles.fontBody}>Contact Support</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ACTIVE RENTALS */}
                    <div className="col-md-6">
                      <div className={glassClass} style={styles.glass}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="fw-bold mb-0 text-white" style={styles.fontHeader}>Active Rentals</h5>
                        </div>
                        {db.activeRentals.map(item => {
                          const progressPercentage = ((item.totalDays - item.daysLeft) / item.totalDays) * 100;
                          const barColor = item.daysLeft <= 1 ? '#dc3545' : styles.gold;
                          
                          return (
                            <div key={item.id} className="d-flex align-items-center mb-3 p-3 rounded-3 transition bg-dark bg-opacity-25" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                              <img src={item.img} className="rounded-3 me-3" style={{width: '60px', height: '60px', objectFit: 'cover'}} alt="Gear" />
                              <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1 text-white" style={{...styles.fontBody, fontSize: '0.9rem'}}>{item.item}</h6>
                                <div className="d-flex justify-content-between mb-1" style={{fontSize: '0.75rem'}}>
                                  <span style={{color: barColor, fontWeight: 'bold'}}>{item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'} left</span>
                                </div>
                                <div className="progress" style={{height: '4px', backgroundColor: 'rgba(255,255,255,0.1)'}}>
                                  <div className="progress-bar" style={{width: `${progressPercentage}%`, backgroundColor: barColor, transition: 'all 0.5s ease'}}></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: ACTIVITY & GALLERY SIDEBAR */}
                <div className="col-xl-4 d-flex flex-column gap-4">
                  {/* DELIVERED GALLERIES */}
                  <div className={glassClass} style={{...styles.glass, height: 'auto'}}>
                    <h5 className="fw-bold mb-4 text-white" style={styles.fontHeader}>My Delivered Galleries</h5>
                    <div className="d-flex flex-column gap-3">
                      {db.deliveredGalleries.map(gallery => (
                        <div key={gallery.id} className="card border-0 bg-transparent overflow-hidden rounded-4" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
                           <img src={gallery.thumb} alt={gallery.name} style={{height: '140px', objectFit: 'cover', width: '100%'}} />
                           <div className="p-3" style={{backgroundColor: 'rgba(255,255,255,0.03)'}}>
                             <h6 className="fw-bold text-white mb-1">{gallery.name}</h6>
                             <small className="d-block mb-3" style={{color: 'rgba(255,255,255,0.5)'}}>{gallery.date}</small>
                             <button className="btn btn-sm w-100 rounded-pill fw-bold" style={{backgroundColor: styles.gold, color: '#1A1A1B'}}>
                               <i className="fas fa-download me-2"></i> Download High-Res
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TIMELINE */}
                  <div className={glassClass} style={{...styles.glass, height: 'auto'}}>
                    <h5 className="fw-bold mb-4 text-white" style={styles.fontHeader}>Activity Timeline</h5>
                    <div className="d-flex flex-column gap-3">
                      {db.timeline.map(item => (
                        <div key={item.id} className="d-flex">
                          <div className="me-4 d-flex flex-column align-items-center">
                            <i className={`fas ${item.icon} rounded-circle d-flex align-items-center justify-content-center`} style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: styles.gold, width: '45px', height: '45px', fontSize: '1.2rem' }}></i>
                            <div className="h-100 mt-2" style={{ width: '2px', background: `linear-gradient(180deg, ${styles.gold} 0%, transparent 100%)` }}></div>
                          </div>
                          <div className="pb-4 text-light pt-1">
                            <h6 className="fw-bold mb-1 text-white" style={styles.fontBody}>{item.title}</h6>
                            <p className="small mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                            <small className="fw-bold" style={{ fontSize: '0.75rem', color: styles.gold }}>{item.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <Profile user={currentUser.name} />}

        </div>

        {/* LOGOUT CONFIRMATION MODAL */}
        {showLogoutModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center fade-in" style={{backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050}}>
            <div className="p-4 p-md-5 rounded-4 shadow-lg" style={{...styles.glass, backgroundColor: '#1A1A1B', maxWidth: '400px', width: '90%'}}>
              <div className="text-center mb-4">
                <i className="fas fa-sign-out-alt fa-3x mb-3" style={{color: styles.gold}}></i>
                <h4 className="fw-bold text-white" style={styles.fontHeader}>Confirm Logout</h4>
                <p style={{color: 'rgba(255,255,255,0.7)'}}>Are you sure you want to end your current session?</p>
              </div>
              <div className="d-flex gap-3">
                <button 
                  className="btn rounded-pill flex-grow-1 fw-bold" 
                  style={{border: '1px solid rgba(255,255,255,0.2)', color: '#FFF'}} 
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn rounded-pill flex-grow-1 border-0 fw-bold shadow" 
                  style={{backgroundColor: styles.gold, color: '#1A1A1B'}} 
                  onClick={confirmLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .placeholder-light::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default UserDashboard;