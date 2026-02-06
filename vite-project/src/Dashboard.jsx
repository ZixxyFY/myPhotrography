import React, { useState } from 'react';
import PropTypes from 'prop-types';

// --- MOCK DATA ---
const bookingRequests = [
  { id: 101, client: "Alice Freeman", type: "Wedding", date: "2023-11-15", location: "Grand Hotel", photographer: "Not Assigned", status: "Confirmed" },
  { id: 102, client: "TechCorp Inc.", type: "Corporate Event", date: "2023-11-20", location: "Convention Center", photographer: "John Lens", status: "Pending" },
  { id: 103, client: "John Smith", type: "Portrait", date: "2023-11-25", location: "Studio A", photographer: "Sarah Click", status: "Pending" },
  { id: 104, client: "Emily Blunt", type: "Product Shoot", date: "2023-11-10", location: "Downtown Loft", photographer: "Sarah Click", status: "Cancelled" },
];

const rentalData = [
  { id: 1, item: "Sony A7S III", renter: "Mike Ross", dueDate: "2023-11-22", status: "Rented", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=100&q=60" },
  { id: 2, item: "Canon EOS R5", renter: "-", dueDate: "-", status: "Available", img: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?auto=format&fit=crop&w=100&q=60" },
  { id: 3, item: "Godox AD200 Pro", renter: "-", dueDate: "-", status: "Maintenance", img: "https://images.unsplash.com/photo-1564463836205-aca312724fd1?auto=format&fit=crop&w=100&q=60" },
  { id: 4, item: "Sigma 85mm Art", renter: "Sarah Connors", dueDate: "2023-11-20", status: "Rented", img: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=100&q=60" },
];

const Dashboard = ({ user, onLogout }) => {
  // 1. Initialize State
  const [activeTab, setActiveTab] = useState('overview');

  // 2. Helper (Not strictly needed with Hooks, can just call setActiveTab directly)
  const switchTab = (tabName) => setActiveTab(tabName);

  // --- SUB-COMPONENTS ---
  const Overview = () => (
    <div className="fade-in">
      <h2 className="mb-4 fw-bold">Dashboard Overview</h2>
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex justify-content-between align-items-center h-100">
              <div>
                <h6 className="text-muted text-uppercase small fw-bold">Total Revenue</h6>
                <h2 className="mb-0 fw-bold">$2,500</h2>
                <small className="text-success"><i className="fas fa-arrow-up me-1"></i>+12.5% vs last month</small>
              </div>
              <div className="bg-light p-3 rounded-3 text-success">
                <i className="fas fa-dollar-sign fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
           <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex justify-content-between align-items-center h-100">
              <div>
                <h6 className="text-muted text-uppercase small fw-bold">Pending Requests</h6>
                <h2 className="mb-0 fw-bold">2</h2>
                <small className="text-warning"><i className="fas fa-exclamation-circle me-1"></i>Needs attention</small>
              </div>
              <div className="bg-light p-3 rounded-3 text-warning">
                <i className="fas fa-user-clock fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
           <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex justify-content-between align-items-center h-100">
              <div>
                <h6 className="text-muted text-uppercase small fw-bold">Active Rentals</h6>
                <h2 className="mb-0 fw-bold">2 / 6</h2>
                <small className="text-primary">Active rentals</small>
              </div>
              <div className="bg-light p-3 rounded-3 text-primary">
                <i className="fas fa-camera fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold">Pending Approvals</h6>
              <button className="btn btn-sm btn-link text-decoration-none" onClick={() => switchTab('bookings')}>View All</button>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {bookingRequests.filter(req => req.status === 'Pending').map(req => (
                  <div key={req.id} className="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold">{req.client}</h6>
                      <small className="text-muted">{req.type} • {req.date}</small>
                    </div>
                    <div className="d-flex gap-2">
                       <button className="btn btn-sm btn-success rounded-circle"><i className="fas fa-check"></i></button>
                       <button className="btn btn-sm btn-danger rounded-circle"><i className="fas fa-times"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold">Active Rentals</h6>
              <button className="btn btn-sm btn-link text-decoration-none" onClick={() => switchTab('rentals')}>Manage Inventory</button>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                 {rentalData.filter(item => item.status === 'Rented').map(item => (
                  <div key={item.id} className="list-group-item border-0 px-4 py-3 d-flex align-items-center">
                    <img src={item.img} alt={item.item} className="rounded me-3" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold">{item.item}</h6>
                      <small className="text-muted">Rented by {item.renter}</small>
                    </div>
                    <small className="text-primary fw-bold">Due {item.dueDate}</small>
                  </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Bookings = () => (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Bookings Management</h2>
        <button className="btn btn-primary"><i className="fas fa-plus me-2"></i>Add Booking</button>
      </div>
      
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-uppercase small text-muted">
              <tr>
                <th className="py-3 ps-4">Client</th>
                <th>Event Details</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map(req => (
                <tr key={req.id}>
                  <td className="ps-4">
                    <div className="fw-bold">{req.client}</div>
                    <small className="text-muted">+1 555-0000</small>
                  </td>
                  <td>
                    <div>{req.type}</div>
                    <small className="text-muted">{req.date}</small>
                  </td>
                  <td>{req.location}</td>
                  <td className="fw-bold">$1,200</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      req.status === 'Confirmed' ? 'bg-success' : 
                      req.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'
                    } px-3 py-2`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm text-muted"><i className="fas fa-ellipsis-h"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const Rentals = () => (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
         <div>
           <h2 className="fw-bold mb-0">Inventory Management</h2>
           <p className="text-muted small mb-0">Track equipment availability and rentals.</p>
         </div>
         <button className="btn btn-dark"><i className="fas fa-plus me-2"></i>Add Equipment</button>
      </div>

      <div className="row g-4">
        {rentalData.map(item => (
          <div key={item.id} className="col-md-6 col-xl-4">
            <div className="card border-0 shadow-sm h-100">
              <div style={{height: '160px', overflow: 'hidden'}} className="position-relative">
                 <img src={item.img} className="card-img-top" alt={item.item} style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                 <div className="position-absolute top-0 end-0 p-2">
                    <span className={`badge ${
                      item.status === 'Available' ? 'bg-success' : 
                      item.status === 'Rented' ? 'bg-primary' : 'bg-warning text-dark'
                    }`}>
                      {item.status}
                    </span>
                 </div>
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">{item.item}</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold">$140 <small className="text-muted fw-normal">/ day</small></span>
                </div>
                
                {item.status === 'Rented' && (
                  <div className="bg-light p-2 rounded mt-3 small border">
                    <div className="text-primary fw-bold">Current Rental</div>
                    <div className="d-flex justify-content-between text-muted">
                       <span>{item.renter}</span>
                       <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                )}

                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary flex-grow-1">Edit</button>
                  {item.status === 'Rented' ? (
                     <button className="btn btn-sm btn-primary flex-grow-1">Return</button>
                  ) : (
                     <button className="btn btn-sm btn-outline-warning flex-grow-1">Maintenance</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* === LEFT SIDEBAR === */}
      <div className="bg-dark text-white d-flex flex-column flex-shrink-0 p-3" style={{width: '260px', height: '100vh', position: 'sticky', top: 0}}>
        
        {/* Logo */}
        <div className="mb-4 px-2 d-flex align-items-center">
          <i className="fas fa-camera fa-lg text-primary me-2"></i>
          <div>
            <h5 className="fw-bold mb-0">E-Imagination</h5>
            <span className="badge bg-secondary" style={{fontSize: '0.65em', letterSpacing: '1px'}}>ADMIN</span>
          </div>
        </div>
        
        {/* Navigation */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-1">
            <button 
              onClick={() => switchTab('overview')}
              className={`nav-link w-100 text-start d-flex align-items-center ${activeTab === 'overview' ? 'active' : 'text-white-50'}`}
            >
              <i className="fas fa-th-large me-3" style={{width: '20px'}}></i> Overview
            </button>
          </li>
          <li className="nav-item mb-1">
            <button 
              onClick={() => switchTab('bookings')}
              className={`nav-link w-100 text-start d-flex align-items-center ${activeTab === 'bookings' ? 'active' : 'text-white-50'}`}
            >
              <i className="fas fa-calendar-alt me-3" style={{width: '20px'}}></i> Bookings
            </button>
          </li>
          <li className="nav-item mb-1">
            <button 
              onClick={() => switchTab('rentals')}
              className={`nav-link w-100 text-start d-flex align-items-center ${activeTab === 'rentals' ? 'active' : 'text-white-50'}`}
            >
              <i className="fas fa-box-open me-3" style={{width: '20px'}}></i> Inventory
            </button>
          </li>
        </ul>

        <hr className="text-secondary" />
        
        {/* User Profile */}
        <div className="mt-auto">
          <div className="d-flex align-items-center text-white text-decoration-none p-2 rounded bg-secondary bg-opacity-25">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 text-white fw-bold" style={{width:'38px', height:'38px'}}>
              {user ? user.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <strong className="d-block text-truncate small">{user || 'Admin User'}</strong>
              <button onClick={onLogout} className="btn btn-link p-0 text-danger text-decoration-none" style={{fontSize: '0.8rem'}}>
                <i className="fas fa-sign-out-alt me-1"></i>Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === RIGHT MAIN CONTENT === */}
      <div className="flex-grow-1 p-4 p-lg-5 overflow-auto" style={{height: '100vh'}}>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'bookings' && <Bookings />}
        {activeTab === 'rentals' && <Rentals />}
      </div>

    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default Dashboard;