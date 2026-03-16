import React, { useState } from 'react';
import PropTypes from 'prop-types';

// --- MOCK DATABASE (With STABLE Image URLs) ---
const db = {
  user: {
    name: "John Doe",
    // Stable Avatar Image
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    points: 2400
  },
  stats: [
    { label: "Upcoming Shoots", value: "2", icon: "fa-calendar-check", color: "primary" },
    { label: "Active Rentals", value: "3", icon: "fa-camera", color: "warning" },
    { label: "Total Spent", value: "$4.5k", icon: "fa-wallet", color: "success" },
    { label: "Reward Points", value: "2,400", icon: "fa-crown", color: "info" }
  ],
  upcoming: {
    id: 101,
    photographer: "Sarah Jenkins",
    type: "Wedding Portfolio",
    date: "Oct 24, 2026",
    time: "10:00 AM - 04:00 PM",
    // Stable Wedding Image
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
  },
  activeRentals: [
    { id: 1, item: "Sony A7S III", due: "Tomorrow", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=100&q=80" },
    { id: 2, item: "Godox AD200", due: "In 3 Days", img: "https://images.unsplash.com/photo-1564463836205-aca312724fd1?auto=format&fit=crop&w=100&q=80" }
  ],
  timeline: [
    { id: 1, title: "Booking Confirmed", desc: "Wedding Shoot w/ Sarah", time: "2h ago", icon: "fa-check-circle", color: "text-success" },
    { id: 2, title: "Equipment Picked Up", desc: "Sony A7S III Kit", time: "Yesterday", icon: "fa-box", color: "text-primary" },
    { id: 3, title: "Album Delivered", desc: "Birthday Bash 2025", time: "3 days ago", icon: "fa-images", color: "text-warning" }
  ],
  // New Data for the "Book" and "Rent" tabs
  photographers: [
    { id: 1, name: "Sarah Jenkins", specialty: "Wedding", rate: "$120/hr", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Mike Ross", specialty: "Portrait", rate: "$80/hr", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
  ],
  equipment: [
    { id: 1, name: "Canon EOS R5", type: "Camera", rate: "$150/day", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "DJI Ronin S", type: "Stabilizer", rate: "$50/day", img: "https://images.unsplash.com/photo-1589873041928-e4b1a457c823?auto=format&fit=crop&w=200&q=80" }
  ]
};

// --- SUB-COMPONENTS ---

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
    { id: 'book', icon: 'fa-user-plus', label: 'Book Photographer' },
    { id: 'my-bookings', icon: 'fa-calendar-alt', label: 'My Bookings' },
    { id: 'rent', icon: 'fa-camera-retro', label: 'Rent Equipment' },
    { id: 'my-rentals', icon: 'fa-box-open', label: 'My Rentals' },
    { id: 'profile', icon: 'fa-user-cog', label: 'Profile' },
  ];

  return (
    <div className="bg-white border-end d-flex flex-column flex-shrink-0 p-3 ds-sidebar" style={{height: '100vh', position: 'sticky', top: 0}}>
      <div className="mb-5 px-2 d-flex align-items-center">
        <i className="fas fa-camera-retro fa-lg text-primary me-2"></i>
        <h5 className="fw-bold mb-0" style={{fontFamily: 'var(--font-base)', color: 'var(--color-text-main)'}}>E-Imagination</h5>
      </div>
      <ul className="nav flex-column mb-auto">
        {menuItems.map(item => (
          <li className="nav-item mb-1" key={item.id}>
            <button 
              onClick={() => setActiveTab(item.id)}
              className={`ds-nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <i className={`fas ${item.icon} me-3`} style={{width: '20px', color: 'inherit'}}></i> {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto border-top pt-3">
        <button onClick={onLogout} className="btn btn-link text-danger text-decoration-none fw-bold small">
          <i className="fas fa-sign-out-alt me-2"></i> Log Out
        </button>
      </div>
    </div>
  );
};

const Topbar = ({ user }) => (
  <div className="d-flex justify-content-between align-items-center mb-5">
    <div className="input-group" style={{maxWidth: '400px'}}>
      <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3"><i className="fas fa-search text-muted"></i></span>
      <input type="text" className="form-control border-start-0 rounded-end-pill bg-white" placeholder="Search photographers, gear..." />
    </div>
    
    <div className="d-flex align-items-center gap-4">
      <div className="position-relative cursor-pointer">
        <i className="fas fa-bell fa-lg text-muted"></i>
        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="text-end d-none d-md-block">
          <small className="d-block fw-bold text-dark">{user.name}</small>
          <small className="d-block text-muted" style={{fontSize: '0.75rem'}}>Premium Member</small>
        </div>
        <img src={user.avatar} alt="User" className="rounded-circle" style={{width: '40px', height: '40px'}} />
      </div>
    </div>
  </div>
);

const DashboardStats = () => (
  <div className="row g-4 mb-4">
    {db.stats.map((stat, idx) => (
      <div className="col-md-3" key={idx}>
        <div className="card border-0 shadow-sm rounded-4 h-100 p-3 hover-scale dashboard-card">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-muted small fw-bold text-uppercase mb-1" style={{fontFamily: 'var(--font-base)', fontSize: 'var(--font-size-xs)'}}>{stat.label}</p>
              <h3 className="fw-bold mb-0" style={{fontFamily: 'var(--font-base)'}}>{stat.value}</h3>
            </div>
            <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded-circle text-${stat.color}`}>
              <i className={`fas ${stat.icon} fa-lg`}></i>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const UpcomingAppointments = () => (
  <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
    <div className="row g-0 h-100">
      <div className="col-md-5">
        <img src={db.upcoming.image} className="img-fluid h-100 w-100" style={{objectFit: 'cover'}} alt="Shoot" />
      </div>
      <div className="col-md-7 p-4 d-flex flex-column justify-content-center">
        <span className="badge bg-primary w-auto align-self-start mb-2">Upcoming</span>
        <h4 className="fw-bold mb-1">{db.upcoming.type}</h4>
        <p className="text-muted mb-3">with {db.upcoming.photographer}</p>
        
        <div className="d-flex gap-4 mb-4 text-muted small">
          <span><i className="fas fa-calendar me-2"></i>{db.upcoming.date}</span>
          <span><i className="fas fa-clock me-2"></i>{db.upcoming.time}</span>
        </div>
        
        <div className="d-flex gap-2">
          <button className="btn btn-dark rounded-pill px-4" onClick={() => alert("Reschedule requested!")}>Reschedule</button>
          <button className="btn btn-outline-danger rounded-pill px-4" onClick={() => alert("Cancellation policy applied.")}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
);

// WIRED UP QUICK ACTIONS
const QuickActions = ({ setActiveTab }) => (
  <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
    <h5 className="fw-bold mb-4">Quick Actions</h5>
    <div className="d-grid gap-3">
      {/* Click -> Switch Tab */}
      <button onClick={() => setActiveTab('book')} className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center">
        <i className="fas fa-camera text-gold me-3 fa-lg"></i>
        <span className="fw-bold">Book Photographer</span>
      </button>
      <button onClick={() => setActiveTab('rent')} className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center">
        <i className="fas fa-box-open text-primary me-3 fa-lg"></i>
        <span className="fw-bold">Rent Equipment</span>
      </button>
      <button className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center" onClick={() => alert("Upload feature coming soon!")}>
        <i className="fas fa-cloud-upload-alt text-info me-3 fa-lg"></i>
        <span className="fw-bold">Upload Inspiration</span>
      </button>
      <button className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center" onClick={() => alert("Support ticket created.")}>
        <i className="fas fa-headset text-danger me-3 fa-lg"></i>
        <span className="fw-bold">Contact Support</span>
      </button>
    </div>
  </div>
);

// WIRED UP ACTIVE RENTALS
const ActiveRentals = ({ setActiveTab }) => (
  <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="fw-bold mb-0">Active Rentals</h5>
      <button className="btn btn-link text-decoration-none small" onClick={() => setActiveTab('my-rentals')}>View All</button>
    </div>
    {db.activeRentals.map(item => (
      <div key={item.id} className="d-flex align-items-center mb-3 p-2 bg-light rounded-3">
        <img src={item.img} className="rounded me-3" style={{width: '50px', height: '50px', objectFit: 'cover'}} alt="Gear" />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-0 small">{item.item}</h6>
          <small className="text-danger fw-bold" style={{fontSize: '0.7rem'}}>Due: {item.due}</small>
        </div>
        <button className="btn btn-sm btn-white border shadow-sm rounded-circle"><i className="fas fa-chevron-right"></i></button>
      </div>
    ))}
    <button className="btn btn-primary w-100 rounded-pill mt-2" onClick={() => setActiveTab('rent')}>Rent More Gear</button>
  </div>
);

const ActivityTimeline = () => (
  <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
    <h5 className="fw-bold mb-4">Activity Timeline</h5>
    <div className="d-flex flex-column gap-3">
      {db.timeline.map(item => (
        <div key={item.id} className="d-flex">
          <div className="me-3 d-flex flex-column align-items-center">
            <i className={`fas ${item.icon} ${item.color} fa-lg bg-light p-2 rounded-circle`}></i>
            <div className="h-100 border-start mt-2" style={{width: '2px'}}></div>
          </div>
          <div className="pb-3">
            <h6 className="fw-bold mb-0 small">{item.title}</h6>
            <p className="text-muted small mb-0">{item.desc}</p>
            <small className="text-muted" style={{fontSize: '0.7rem'}}>{item.time}</small>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- NEW SUB-COMPONENTS FOR INTERACTIVITY ---

const BookingView = () => (
  <div className="fade-in">
    <h3 className="fw-bold mb-4">Book a Photographer</h3>
    <div className="row g-4">
      {db.photographers.map(p => (
        <div className="col-md-6" key={p.id}>
          <div className="card border-0 shadow-sm h-100 card-modern">
            <div className="d-flex p-3 align-items-center">
              <img src={p.img} className="rounded-circle me-3" style={{width: '80px', height: '80px', objectFit: 'cover'}} alt={p.name} />
              <div>
                <h5 className="fw-bold mb-1">{p.name}</h5>
                <span className="badge bg-gold text-dark mb-2">{p.specialty}</span>
                <p className="mb-0 text-muted small">{p.rate}</p>
              </div>
              <button className="btn btn-dark ms-auto btn-sm rounded-pill px-3">Book Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RentalView = () => (
  <div className="fade-in">
    <h3 className="fw-bold mb-4">Rent Equipment</h3>
    <div className="row g-4">
      {db.equipment.map(e => (
        <div className="col-md-4" key={e.id}>
          <div className="card border-0 shadow-sm h-100 card-modern">
            <img src={e.img} className="card-img-top" style={{height: '180px', objectFit: 'cover'}} alt={e.name} />
            <div className="card-body">
              <h5 className="fw-bold">{e.name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">{e.type}</span>
                <span className="fw-bold text-primary">{e.rate}</span>
              </div>
              <button className="btn btn-outline-dark w-100 mt-3 rounded-pill btn-sm">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN LAYOUT COMPONENT ---

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="d-flex min-vh-100 bg-light ds-layout">
      {/* 1. SIDEBAR */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* 2. MAIN CONTENT */}
      <div className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        <Topbar user={{...db.user, name: user || db.user.name}} />

        {/* DYNAMIC CONTENT SWITCHER */}
        {activeTab === 'dashboard' && (
          <div className="fade-in">
            <div className="mb-4">
              <h2 className="fw-bold">{getGreeting()}, {user || "John"}!</h2>
              <p className="text-muted">Here is what's happening with your projects today.</p>
            </div>

            <DashboardStats />

            <div className="row g-4 mb-4">
              <div className="col-lg-8">
                <UpcomingAppointments />
              </div>
              <div className="col-lg-4">
                {/* PASS setActiveTab TO QUICK ACTIONS */}
                <QuickActions setActiveTab={setActiveTab} />
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                 {/* PASS setActiveTab TO ACTIVE RENTALS */}
                <ActiveRentals setActiveTab={setActiveTab} />
              </div>
              <div className="col-lg-6">
                <ActivityTimeline />
              </div>
            </div>
          </div>
        )}

        {/* NEW INTERACTIVE TABS */}
        {activeTab === 'book' && <BookingView />}
        {activeTab === 'rent' && <RentalView />}
        
        {/* Placeholder for others */}
        {['my-bookings', 'my-rentals', 'wishlist', 'payments', 'profile'].includes(activeTab) && (
          <div className="fade-in text-center py-5">
            <i className="fas fa-tools fa-3x text-muted mb-3"></i>
            <h3>{activeTab.replace('-', ' ').toUpperCase()} Section</h3>
            <p className="text-muted">This module is under development.</p>
            <button className="btn btn-outline-primary mt-3" onClick={() => setActiveTab('dashboard')}>Go Back Home</button>
          </div>
        )}

      </div>

      {/* FLOATING CTA */}
      <div className="position-fixed bottom-0 end-0 p-4" style={{zIndex: 100}}>
        <button 
            className="btn btn-ds-gold btn-lg shadow-lg rounded-pill fw-bold text-uppercase px-4"
            onClick={() => setActiveTab('book')}
        >
          <i className="fas fa-plus me-2"></i> Book Now
        </button>
      </div>
    </div>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default UserDashboard;