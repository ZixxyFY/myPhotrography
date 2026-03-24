import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Row, Col, Nav, Table, Card, Badge, Form, Button, 
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
      className={`sidebar-link d-flex justify-content-between align-items-center ${active ? 'active fw-bold' : ''}`} 
      style={{
        cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', 
        color: active ? '#0ea5e9' : '#64748b', 
        backgroundColor: active ? '#e0f2fe' : 'transparent',
        marginBottom: '4px', transition: 'all 0.2s ease', fontFamily: 'sans-serif'
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
      </div>
      {hasSubmenu && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
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
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [studios, setStudios] = useState(INITIAL_STUDIOS);
  
  // UI Interactive State
  const [openMenus, setOpenMenus] = useState({ orders: true, services: false });
  const [chartRange, setChartRange] = useState('1Y');
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  
  // View Order Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dynamic Date Generator
  const todayDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

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

      // ... Rest of the cases remain structurally the same but font applied ...
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
          <Card className="border-0 shadow-sm p-5 mx-auto rounded-4" style={{maxWidth: '800px', fontFamily: 'sans-serif'}}>
            <h3 className="mb-4 fw-bold">Admin Profile Settings</h3>
            <Form>
              <Row className="mb-4 g-3">
                <Col md={6}><Form.Label className="fw-bold small text-muted">First Name</Form.Label><Form.Control defaultValue="Admin" className="bg-light border-0 py-2" /></Col>
                <Col md={6}><Form.Label className="fw-bold small text-muted">Last Name</Form.Label><Form.Control defaultValue="User" className="bg-light border-0 py-2" /></Col>
              </Row>
              <Form.Group className="mb-4"><Form.Label className="fw-bold small text-muted">Email Address</Form.Label><Form.Control defaultValue="admin@e-imagination.com" className="bg-light border-0 py-2" /></Form.Group>
              <Form.Group className="mb-5"><Form.Label className="fw-bold small text-muted">Business Name</Form.Label><Form.Control defaultValue="E-Imagination Studios" className="bg-light border-0 py-2" /></Form.Group>
              <Button variant="primary" className="px-5 py-2 rounded-pill fw-bold">Save Changes</Button>
            </Form>
          </Card>
        );

      default:
        return (
          <div className="p-5 text-center text-muted d-flex flex-column align-items-center justify-content-center h-100" style={{fontFamily: 'sans-serif'}}>
             <ImageIcon size={64} className="mb-3 opacity-25" />
             <h3 className="fw-bold">{currentView}</h3>
             <p>This module is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="d-flex bg-light min-vh-100 font-sans text-dark ds-layout">
      
      {/* SIDEBAR */}
      <div className="bg-white border-end d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2 text-primary" style={{ letterSpacing: '-0.5px', fontFamily: 'var(--font-base)' }}>
            <Camera size={28} /> LensDash
          </h4>
        </div>
        
        <Nav className="flex-column px-3 pb-5 gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'Dashboard'} onClick={() => handleNavClick('Dashboard')} />

          <SidebarItem icon={ShoppingCart} label="Orders" active={currentView === 'Orders'} hasSubmenu isOpen={openMenus.orders} onClick={() => toggleMenu('orders')}>
            <div className="ms-4 ps-3 border-start py-1">
              <div className={`p-2 small cursor-pointer rounded ${orderFilter === 'New' && currentView === 'Orders' ? 'bg-primary text-white fw-bold' : 'text-muted hover-bg-light'}`} onClick={() => handleNavClick('Orders', 'New')}>New Orders</div>
              <div className={`p-2 small cursor-pointer rounded ${orderFilter === 'Confirmed' && currentView === 'Orders' ? 'bg-primary text-white fw-bold' : 'text-muted hover-bg-light'}`} onClick={() => handleNavClick('Orders', 'Confirmed')}>Confirmed Orders</div>
              <div className={`p-2 small cursor-pointer rounded ${orderFilter === 'Completed' && currentView === 'Orders' ? 'bg-primary text-white fw-bold' : 'text-muted hover-bg-light'}`} onClick={() => handleNavClick('Orders', 'Completed')}>Completed Orders</div>
              <div className={`p-2 small cursor-pointer rounded ${orderFilter === 'Cancelled' && currentView === 'Orders' ? 'bg-primary text-white fw-bold' : 'text-muted hover-bg-light'}`} onClick={() => handleNavClick('Orders', 'Cancelled')}>Cancelled Orders</div>
            </div>
          </SidebarItem>

          <SidebarItem icon={Package} label="Services" active={currentView === 'Services'} onClick={() => handleNavClick('Services')} />
          <SidebarItem icon={Users} label="Studios" active={currentView === 'Studios'} onClick={() => handleNavClick('Studios')} />
          <SidebarItem icon={Calendar} label="Availability" active={currentView === 'Availability'} onClick={() => handleNavClick('Availability')} />
          <SidebarItem icon={ImageIcon} label="Portfolio" active={currentView === 'Portfolio'} onClick={() => handleNavClick('Portfolio')} />
          <SidebarItem icon={CreditCard} label="Payment" active={currentView === 'Payment'} onClick={() => handleNavClick('Payment')} />
          
          <div className="mt-4 mb-2 text-muted small px-3 fw-bold text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>Settings</div>
          <SidebarItem icon={Settings} label="Profile" active={currentView === 'Settings'} onClick={() => handleNavClick('Settings')} />
        </Nav>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-grow-1 d-flex flex-column" style={{overflowX: 'hidden'}}>
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" style={{zIndex: 100, height: '70px'}}>
          <div className="d-flex align-items-center gap-3">
            <Button variant="light" className="d-lg-none"><Menu size={20}/></Button>
            {/* Search Bar Placeholder */}
            <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-2" style={{width: '300px'}}>
               <i className="fas fa-search text-muted me-2"></i>
               <input type="text" className="border-0 bg-transparent w-100" placeholder="Search orders, clients..." style={{outline: 'none', fontSize: '0.9rem'}} />
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-4">
             <div className="position-relative cursor-pointer">
               <Bell size={22} className="text-secondary"/>
               <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
             </div>
             
             {/* Working Profile Dropdown */}
             <Dropdown align="end">
                <Dropdown.Toggle as="div" className="d-flex align-items-center gap-2 cursor-pointer" style={{cursor: 'pointer'}}>
                  <div className="text-end d-none d-md-block">
                     <p className="mb-0 fw-bold lh-1 text-dark" style={{fontSize: '0.9rem'}}>{user || 'Admin User'}</p>
                     <small className="text-muted" style={{fontSize: '0.75rem'}}>Administrator</small>
                  </div>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: 40, height: 40}}>
                     {user ? user.charAt(0).toUpperCase() : 'A'}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0 shadow-lg rounded-3 mt-2">
                  <Dropdown.Header>Welcome, Admin</Dropdown.Header>
                  <Dropdown.Item onClick={() => handleNavClick('Settings')}><Settings size={16} className="me-2"/> Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout} className="text-danger fw-bold"><LogOut size={16} className="me-2"/> Log Out</Dropdown.Item>
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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0"><Modal.Title className="fw-bold">Add New {modalType}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Label className="fw-bold small text-muted">Name</Form.Label>
          <Form.Control className="bg-light border-0 py-2 mb-3" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder={`Enter ${modalType} Name`} />
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" className="rounded-pill" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" className="rounded-pill px-4" onClick={handleAddItem}>Save {modalType}</Button>
        </Modal.Footer>
      </Modal>

      {/* 2. Interactive Order Details Modal */}
      <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)} centered size="lg">
        {selectedOrder && (
          <>
            <Modal.Header closeButton className="border-bottom bg-light">
              <Modal.Title className="fw-bold d-flex align-items-center gap-3">
                 Order #{selectedOrder.id}
                 <StatusBadge status={selectedOrder.status} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4" style={{fontFamily: 'sans-serif'}}>
              <Row className="g-4 mb-4">
                 <Col md={6}>
                    <h6 className="fw-bold text-muted text-uppercase small mb-3">Client Details</h6>
                    <p className="mb-1 fw-bold fs-5">{selectedOrder.client}</p>
                    <p className="mb-1 text-muted"><i className="fas fa-envelope me-2 w-15px text-center"></i> {selectedOrder.email}</p>
                    <p className="mb-1 text-muted"><i className="fas fa-phone me-2 w-15px text-center"></i> {selectedOrder.phone}</p>
                    <p className="mb-0 text-muted"><i className="fas fa-map-marker-alt me-2 w-15px text-center"></i> {selectedOrder.location}</p>
                 </Col>
                 <Col md={6}>
                    <h6 className="fw-bold text-muted text-uppercase small mb-3">Order Summary</h6>
                    <Card className="border-0 bg-light rounded-3 p-3">
                       <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Service Booked</span>
                          <span className="fw-bold">{selectedOrder.service}</span>
                       </div>
                       <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Schedule</span>
                          <span className="fw-bold">{selectedOrder.date} at {selectedOrder.time}</span>
                       </div>
                       <hr className="my-2"/>
                       <div className="d-flex justify-content-between">
                          <span className="text-muted">Total Amount</span>
                          <span className="fw-bold fs-5 text-primary">${selectedOrder.amount.toLocaleString()}</span>
                       </div>
                    </Card>
                 </Col>
              </Row>
              <div className="d-flex gap-2 justify-content-end mt-4 border-top pt-3">
                 {selectedOrder.status !== 'Cancelled' && (
                    <Button variant="outline-danger" className="rounded-pill px-4" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Cancelled')}>Cancel Order</Button>
                 )}
                 {selectedOrder.status === 'New' && (
                    <Button variant="primary" className="rounded-pill px-4" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Confirmed')}>Confirm Order</Button>
                 )}
                 {selectedOrder.status === 'Confirmed' && (
                    <Button variant="success" className="rounded-pill px-4" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'Completed')}>Mark Completed</Button>
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