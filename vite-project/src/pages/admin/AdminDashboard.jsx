import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Row, Col, Table, Card, Badge, Form, Button, 
  Collapse, Modal, Container, Dropdown, ButtonGroup 
} from 'react-bootstrap';
import { 
  LayoutDashboard, ShoppingCart, Camera, Users, Package, Calendar, 
  Image as ImageIcon, CreditCard, Settings, ChevronDown, 
  ChevronRight, Bell, Menu, Eye, Plus, Trash2, LogOut
} from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import ServicesView from './ServicesView';
import StatusBadge from '../../components/StatusBadge';
import { MOCK_ORDERS } from '../../data/mockOrders';
import { getProjects } from '../../api/projectApi';

// --- 1. MOCK DATABASE ---
const INITIAL_SERVICES = [
  { id: 1, name: 'Wedding Photography', price: '$2000', category: 'Wedding' },
  { id: 2, name: 'Portrait Session', price: '$300', category: 'Portrait' },
];

const INITIAL_STUDIOS = [
  { id: 1, name: 'Downtown Loft', location: '123 Main St', capacity: 10 },
  { id: 2, name: 'Garden Studio', location: '456 Oak Ln', capacity: 25 },
];

// --- 2. HELPER COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu, isOpen, onClick, children }) => (
  <>
    <div 
      onClick={onClick} 
      className={`d-flex justify-content-between align-items-center ${active ? 'fw-bold' : ''}`} 
      style={{
        cursor: 'pointer', 
        padding: '12px 16px', 
        borderRadius: '8px', 
        color: active ? '#C5A059' : '#A0A0A0', 
        backgroundColor: active ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
        marginBottom: '4px', 
        transition: 'all 0.2s ease', 
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} color={active ? '#C5A059' : '#A0A0A0'} />
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
      </div>
      {hasSubmenu && (isOpen ? <ChevronDown size={16} color={active ? '#C5A059' : '#A0A0A0'} /> : <ChevronRight size={16} color={active ? '#C5A059' : '#A0A0A0'} />)}
    </div>
    <Collapse in={isOpen}>
      <div className="d-flex flex-column gap-1 mb-2 mt-1">
        {children}
      </div>
    </Collapse>
  </>
);

// --- 3. MAIN COMPONENT ---
const Dashboard = ({ user, onLogout }) => {
  // Global & Routing State
  const [currentView, setCurrentView] = useState('Dashboard');
  const [orderFilter, setOrderFilter] = useState('All');
  
  // Data State
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [studios, setStudios] = useState(INITIAL_STUDIOS);
  
  // UI Interactive State
  const [openMenus, setOpenMenus] = useState({ orders: true, services: false });
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  
  // View Order Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dynamic Date Generator
  const todayDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // ── Fetch live projects from MongoDB and merge into orders ──
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      console.log('[AdminDashboard] ⏳ Fetching projects from API...');
      try {
        const res = await getProjects();
        console.log('[AdminDashboard] ✅ API Response:', res);
        console.log('[AdminDashboard] 📦 res.data:', res.data);

        // Guard: ensure the response is an array
        if (!Array.isArray(res.data)) {
          console.error('[AdminDashboard] ❌ Expected an array but got:', typeof res.data, res.data);
          return;
        }

        if (res.data.length === 0) {
          console.warn('[AdminDashboard] ⚠️ API returned an empty array. No projects in MongoDB yet.');
          return;
        }

        // Map MongoDB Project documents → order shape used by the UI
        const mappedOrders = res.data.map((project) => {
          console.log('[AdminDashboard] 🔄 Mapping project:', project);
          // Normalise status: "pending" → "New", otherwise capitalise
          const statusMap = {
            pending: 'New',
            confirmed: 'Confirmed',
            completed: 'Completed',
            cancelled: 'Cancelled',
          };
          const rawStatus = (project.status || 'pending').toLowerCase();
          const mappedStatus = statusMap[rawStatus] || 'New';

          return {
            id: project._id,                          // MongoDB ObjectId string
            date: project.date
              ? new Date(project.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : new Date(project.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            time: '',
            client: project.client || 'Unknown Client',
            email: '',
            amount: 0,
            status: mappedStatus,
            location: project.type || 'N/A',          // use shoot type as location proxy
            phone: '',
            service: project.title || 'Photography Project',
          };
        });

        console.log('[AdminDashboard] 🗂️ Mapped orders from API:', mappedOrders);

        // Prepend live DB orders; keep MOCK_ORDERS at the end as fallback
        setOrders([...mappedOrders, ...MOCK_ORDERS]);
        console.log('[AdminDashboard] 🎉 setOrders called — state will re-render.');

      } catch (err) {
        console.error('[AdminDashboard] 🔥 API call failed!', err);
        if (err.response) {
          // Server responded with a non-2xx status
          console.error('[AdminDashboard] 📡 Status:', err.response.status, '| Data:', err.response.data);
        } else if (err.request) {
          // Request was sent but no response (CORS / network / server down)
          console.error('[AdminDashboard] 🚫 No response received. Is the backend running on port 5000? CORS issue?', err.request);
        } else {
          console.error('[AdminDashboard] ⚙️ Axios setup error:', err.message);
        }
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []); // runs once on mount

  // Handlers
  const toggleMenu = (key) => setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  
  const handleNavClick = (view, filter = 'All') => {
    setCurrentView(view);
    setOrderFilter(filter);
  };

  const handleAddItem = () => {
    if (modalType === 'Service') {
      setServices([...services, { id: Date.now(), name: newItemName, price: '$500', category: 'General' }]);
    } else if (modalType === 'Studio') {
      setStudios([...studios, { id: Date.now(), name: newItemName, location: 'New Location', capacity: 5 }]);
    }
    setShowAddModal(false);
    setNewItemName('');
  };

  const handleDelete = (id, type) => {
    if (type === 'Service') setServices(services.filter(s => s.id !== id));
    if (type === 'Studio') setStudios(studios.filter(s => s.id !== id));
  };

  const handleUpdateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updatedOrders);
    setSelectedOrder(updatedOrders.find(o => o.id === id));
  };

  // --- RENDER CONTENT BASED ON VIEW ---
  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardOverview orders={orders} onRowClick={setSelectedOrder} />;

      case 'Orders': {
        const filteredOrders = orders.filter(o => orderFilter === 'All' || o.status === orderFilter);
        return <OrdersView orders={filteredOrders} filter={orderFilter} onRowClick={setSelectedOrder} />;
      }

      case 'Services':
        return (
          <ServicesView 
            services={services} 
            onAddClick={() => { setModalType('Service'); setShowAddModal(true); }} 
            onDelete={(id) => handleDelete(id, 'Service')} 
          />
        );

      case 'Settings':
        return (
          <Card className="border-0 shadow-sm p-5 mx-auto" style={{maxWidth: '800px', backgroundColor: '#242426', borderRadius: '12px', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
            <h3 className="mb-4 fw-bold" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>Admin Profile Settings</h3>
            <Form>
              <Row className="mb-4 g-3">
                <Col md={6}>
                  <Form.Label style={{color: '#A0A0A0'}}>First Name</Form.Label>
                  <Form.Control defaultValue="Admin" style={{backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} className="shadow-none focus-ring focus-ring-warning py-2" />
                </Col>
                <Col md={6}>
                  <Form.Label style={{color: '#A0A0A0'}}>Last Name</Form.Label>
                  <Form.Control defaultValue="User" style={{backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} className="shadow-none focus-ring focus-ring-warning py-2" />
                </Col>
              </Row>
              <Form.Group className="mb-4">
                <Form.Label style={{color: '#A0A0A0'}}>Email Address</Form.Label>
                <Form.Control defaultValue="admin@e-imagination.com" style={{backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} className="shadow-none focus-ring focus-ring-warning py-2" />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label style={{color: '#A0A0A0'}}>Business Name</Form.Label>
                <Form.Control defaultValue="E-Imagination Studios" style={{backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} className="shadow-none focus-ring focus-ring-warning py-2" />
              </Form.Group>
              <Button className="px-5 py-2 rounded-pill fw-bold border-0" style={{backgroundColor: '#C5A059', color: '#1A1A1B'}}>Save Changes</Button>
            </Form>
          </Card>
        );

      default:
        return (
          <div className="p-5 text-center d-flex flex-column align-items-center justify-content-center h-100" style={{color: '#A0A0A0'}}>
             <ImageIcon size={64} className="mb-3 opacity-25" />
             <h3 className="fw-bold" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>{currentView}</h3>
             <p>This module is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="d-flex min-vh-100 ds-layout" style={{ backgroundColor: '#1A1A1B', color: '#F5F5F7', fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* ── GLOBAL THEME OVERRIDES FOR BOOTSTRAP BLUES ── */}
      <style>{`
        /* 1. Primary Buttons (e.g., "Add Service", "View", etc.) */
        .btn-primary {
          background-color: #C5A059 !important;
          border-color: #C5A059 !important;
          color: #1A1A1B !important;
        }
        .btn-primary:hover, .btn-primary:focus, .btn-primary:active {
          background-color: #D4AF6A !important;
          border-color: #D4AF6A !important;
          color: #1A1A1B !important;
          box-shadow: 0 0 0 0.25rem rgba(197, 160, 89, 0.25) !important;
        }
        
        /* 2. Outline Buttons (e.g., "1M, 6M, 1Y" filters) */
        .btn-outline-primary {
          color: #C5A059 !important;
          border-color: #C5A059 !important;
        }
        .btn-outline-primary:hover, .btn-outline-primary.active, .btn-check:checked + .btn-outline-primary {
          background-color: #C5A059 !important;
          color: #1A1A1B !important;
          border-color: #C5A059 !important;
        }

        /* 3. Badges (e.g., "New", "Confirmed", "Portrait", "Wedding") */
        .badge.bg-primary, .bg-primary {
          background-color: rgba(197, 160, 89, 0.15) !important;
          color: #C5A059 !important;
          border: 1px solid rgba(197, 160, 89, 0.4) !important;
        }
        .badge.bg-info, .bg-info {
          background-color: rgba(197, 160, 89, 0.15) !important;
          color: #C5A059 !important;
          border: 1px solid rgba(197, 160, 89, 0.4) !important;
        }
      `}</style>

      {/* SIDEBAR */}
      <div className="d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto', backgroundColor: '#242426', borderRight: '1px solid rgba(197, 160, 89, 0.2)' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2" style={{ letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif", color: '#C5A059' }}>
            <Camera size={28} /> LensDash
          </h4>
        </div>
        
        <div className="d-flex flex-column px-3 pb-5 gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'Dashboard'} onClick={() => handleNavClick('Dashboard')} />

          <SidebarItem icon={ShoppingCart} label="Orders" active={currentView === 'Orders'} hasSubmenu isOpen={openMenus.orders} onClick={() => toggleMenu('orders')}>
            <div className="ms-4 ps-3 py-1" style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.2)' }}>
              {/* FIX: Explicit cursor: pointer to fix I-beam hover issue */}
              <div className="p-2 small rounded" style={{ cursor: 'pointer', color: orderFilter === 'New' && currentView === 'Orders' ? '#C5A059' : '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'New')}>New Orders</div>
              <div className="p-2 small rounded" style={{ cursor: 'pointer', color: orderFilter === 'Confirmed' && currentView === 'Orders' ? '#C5A059' : '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Confirmed')}>Confirmed Orders</div>
              <div className="p-2 small rounded" style={{ cursor: 'pointer', color: orderFilter === 'Completed' && currentView === 'Orders' ? '#C5A059' : '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Completed')}>Completed Orders</div>
              <div className="p-2 small rounded" style={{ cursor: 'pointer', color: orderFilter === 'Cancelled' && currentView === 'Orders' ? '#C5A059' : '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Cancelled')}>Cancelled Orders</div>
            </div>
          </SidebarItem>

          <SidebarItem icon={Package} label="Services" active={currentView === 'Services'} onClick={() => handleNavClick('Services')} />
          <SidebarItem icon={Users} label="Studios" active={currentView === 'Studios'} onClick={() => handleNavClick('Studios')} />
          <SidebarItem icon={Calendar} label="Availability" active={currentView === 'Availability'} onClick={() => handleNavClick('Availability')} />
          <SidebarItem icon={ImageIcon} label="Portfolio" active={currentView === 'Portfolio'} onClick={() => handleNavClick('Portfolio')} />
          <SidebarItem icon={CreditCard} label="Payment" active={currentView === 'Payment'} onClick={() => handleNavClick('Payment')} />
          
          <div className="mt-4 mb-2 small px-3 fw-bold text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px', color: '#A0A0A0'}}>Settings</div>
          <SidebarItem icon={Settings} label="Profile" active={currentView === 'Settings'} onClick={() => handleNavClick('Settings')} />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-grow-1 d-flex flex-column" style={{overflowX: 'hidden'}}>
        <header className="px-4 py-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" style={{zIndex: 100, height: '70px', backgroundColor: '#242426', borderBottom: '1px solid rgba(197, 160, 89, 0.2)'}}>
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="d-lg-none p-0" style={{color: '#C5A059'}}><Menu size={20}/></Button>
            
            <div className="d-none d-md-flex align-items-center rounded-pill px-3 py-2" style={{width: '300px', backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
               <i className="fas fa-search me-2" style={{color: '#A0A0A0'}}></i>
               <input type="text" className="border-0 bg-transparent w-100 text-light shadow-none" placeholder="Search orders, clients..." style={{outline: 'none', fontSize: '0.9rem'}} />
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-4">
             <div className="position-relative cursor-pointer">
               <Bell size={22} color="#C5A059"/>
               <span className="position-absolute top-0 start-100 translate-middle p-1 rounded-circle" style={{backgroundColor: '#DC3545', border: '1px solid #242426'}}></span>
             </div>
             
             {/* Working Profile Dropdown styled for Dark Mode */}
             <Dropdown align="end">
                <Dropdown.Toggle as="div" className="d-flex align-items-center gap-2 cursor-pointer" style={{cursor: 'pointer'}}>
                  <div className="text-end d-none d-md-block">
                     <p className="mb-0 fw-bold lh-1" style={{fontSize: '0.9rem', color: '#F5F5F7'}}>{user || 'Admin User'}</p>
                     <small style={{fontSize: '0.75rem', color: '#C5A059'}}>Administrator</small>
                  </div>
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: 40, height: 40, backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#C5A059', border: '1px solid rgba(197, 160, 89, 0.5)'}}>
                     {user ? user.charAt(0).toUpperCase() : 'A'}
                  </div>
                </Dropdown.Toggle>
                
                <Dropdown.Menu className="border-0 shadow-lg rounded-3 mt-2" style={{backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
                  <Dropdown.Header style={{color: '#A0A0A0'}}>Welcome, Admin</Dropdown.Header>
                  <Dropdown.Item onClick={() => handleNavClick('Settings')} style={{color: '#F5F5F7'}} className="dropdown-item-dark"><Settings size={16} className="me-2"/> Settings</Dropdown.Item>
                  <Dropdown.Divider style={{borderColor: 'rgba(197, 160, 89, 0.2)'}} />
                  <Dropdown.Item onClick={onLogout} style={{color: '#DC3545'}} className="fw-bold dropdown-item-dark"><LogOut size={16} className="me-2"/> Log Out</Dropdown.Item>
                </Dropdown.Menu>
             </Dropdown>
          </div>
        </header>

        <Container fluid className="p-4 p-md-5">
          {renderContent()}
        </Container>
      </div>

      {/* --- MODALS --- */}
      {/* 1. Modal for Adding Services/Studios */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered style={{ '--bs-modal-bg': '#242426' }}>
        <Modal.Header closeButton closeVariant="white" className="border-0 pb-0">
            <Modal.Title className="fw-bold" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>Add New {modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label style={{color: '#A0A0A0'}} className="fw-bold small">Name</Form.Label>
          <Form.Control style={{backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} className="py-2 mb-3 shadow-none focus-ring focus-ring-warning" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder={`Enter ${modalType} Name`} />
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="link" style={{color: '#A0A0A0', textDecoration: 'none'}} onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button className="rounded-pill px-4 border-0 fw-bold" style={{backgroundColor: '#C5A059', color: '#1A1A1B'}} onClick={handleAddItem}>Save {modalType}</Button>
        </Modal.Footer>
      </Modal>

      {/* 2. Interactive Order Details Modal */}
      <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)} centered size="lg" style={{ '--bs-modal-bg': '#242426' }}>
        {selectedOrder && (
          <>
            <Modal.Header closeButton closeVariant="white" style={{borderBottom: '1px solid rgba(197, 160, 89, 0.2)'}}>
              <Modal.Title className="fw-bold d-flex align-items-center gap-3" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>
                 Order #{selectedOrder.id}
                 <StatusBadge status={selectedOrder.status} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4" style={{fontFamily: "'Montserrat', sans-serif"}}>
              <Row className="g-4 mb-4">
                 <Col md={6}>
                    <h6 className="fw-bold text-uppercase small mb-3" style={{color: '#C5A059'}}>Client Details</h6>
                    <p className="mb-1 fw-bold fs-5" style={{color: '#F5F5F7'}}>{selectedOrder.client}</p>
                    <p className="mb-1" style={{color: '#A0A0A0'}}><i className="fas fa-envelope me-2 w-15px text-center"></i> {selectedOrder.email || 'client@example.com'}</p>
                    <p className="mb-1" style={{color: '#A0A0A0'}}><i className="fas fa-phone me-2 w-15px text-center"></i> {selectedOrder.phone || '+1 234 567 8900'}</p>
                    <p className="mb-0" style={{color: '#A0A0A0'}}><i className="fas fa-map-marker-alt me-2 w-15px text-center"></i> {selectedOrder.location}</p>
                 </Col>
                 <Col md={6}>
                    <h6 className="fw-bold text-uppercase small mb-3" style={{color: '#C5A059'}}>Order Summary</h6>
                    <Card className="border-0 rounded-3 p-3" style={{backgroundColor: '#1A1A1B'}}>
                       <div className="d-flex justify-content-between mb-2">
                          <span style={{color: '#A0A0A0'}}>Service Booked</span>
                          <span className="fw-bold" style={{color: '#F5F5F7'}}>{selectedOrder.service || 'Photography'}</span>
                       </div>
                       <div className="d-flex justify-content-between mb-2">
                          <span style={{color: '#A0A0A0'}}>Schedule</span>
                          <span className="fw-bold" style={{color: '#F5F5F7'}}>{selectedOrder.date} at {selectedOrder.time || '10:00 AM'}</span>
                       </div>
                       <hr className="my-2" style={{borderColor: 'rgba(197, 160, 89, 0.3)'}}/>
                       <div className="d-flex justify-content-between">
                          <span style={{color: '#A0A0A0'}}>Total Amount</span>
                          <span className="fw-bold fs-5" style={{color: '#C5A059'}}>${selectedOrder.amount.toLocaleString()}</span>
                       </div>
                    </Card>
                 </Col>
              </Row>
              
              <div className="d-flex gap-2 justify-content-end mt-4 pt-3" style={{borderTop: '1px solid rgba(197, 160, 89, 0.2)'}}>
                 {selectedOrder.status !== 'Cancelled' && (
                    <Button className="rounded-pill px-4" style={{backgroundColor: 'transparent', border: '1px solid #DC3545', color: '#DC3545'}} onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Cancelled')}>Cancel Order</Button>
                 )}
                 {selectedOrder.status === 'New' && (
                    <Button className="rounded-pill px-4 border-0 fw-bold" style={{backgroundColor: '#C5A059', color: '#1A1A1B'}} onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Confirmed')}>Confirm Order</Button>
                 )}
                 {selectedOrder.status === 'Confirmed' && (
                    <Button className="rounded-pill px-4 border-0 fw-bold" style={{backgroundColor: '#198754', color: '#FFF'}} onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Completed')}>Mark Completed</Button>
                 )}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default Dashboard;