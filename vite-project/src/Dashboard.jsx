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
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- 1. MOCK DATABASE ---
const INITIAL_ORDERS = [
  { id: '12478', date: '12 Aug 2024', time: '14:36', client: 'Janet Adebayo', email: 'janet@example.com', amount: 25000, status: 'Completed', location: 'Manchester', phone: '+44 7700 900077', service: 'Wedding Photography' },
  { id: '24587', date: '14 Aug 2024', time: '09:15', client: 'James Smith', email: 'james@example.com', amount: 15200, status: 'Confirmed', location: 'London', phone: '+44 7700 900123', service: 'Event Coverage' },
  { id: '45789', date: '15 Aug 2024', time: '16:45', client: 'Robert Doe', email: 'robert@example.com', amount: 8500, status: 'New', location: 'Leeds', phone: '+44 7700 900456', service: 'Portrait Session' },
  { id: '99887', date: '16 Aug 2024', time: '11:30', client: 'Alice Brown', email: 'alice@example.com', amount: 0, status: 'Cancelled', location: 'Liverpool', phone: '+44 7700 900789', service: 'Product Shoot' },
];

const INITIAL_SERVICES = [
  { id: 1, name: 'Wedding Photography', price: '$2000', category: 'Wedding' },
  { id: 2, name: 'Portrait Session', price: '$300', category: 'Portrait' },
];

const INITIAL_STUDIOS = [
  { id: 1, name: 'Downtown Loft', location: '123 Main St', capacity: 10 },
  { id: 2, name: 'Garden Studio', location: '456 Oak Ln', capacity: 25 },
];

// --- DYNAMIC CHART DATA ---
const CHART_DATA = {
  '1Y': [{n:'Jan',v:20000}, {n:'Feb',v:45000}, {n:'Mar',v:30000}, {n:'Apr',v:70000}, {n:'May',v:50000}, {n:'Jun',v:65000}],
  '6M': [{n:'Jan',v:15000}, {n:'Feb',v:25000}, {n:'Mar',v:40000}, {n:'Apr',v:35000}, {n:'May',v:55000}, {n:'Jun',v:45000}],
  '1M': [{n:'Week 1',v:5000}, {n:'Week 2',v:12000}, {n:'Week 3',v:8000}, {n:'Week 4',v:15000}]
};

// --- 2. HELPER COMPONENTS ---
const StatusBadge = ({ status }) => {
  let variant = 'secondary';
  if (status === 'Completed') variant = 'success';
  if (status === 'Confirmed') variant = 'info';
  if (status === 'New') variant = 'warning';
  if (status === 'Cancelled') variant = 'danger';
  
  return (
    <Badge bg={`${variant}-subtle`} text={variant === 'light' ? 'dark' : variant} className="px-3 py-2 rounded-pill fw-bold" style={{fontFamily: 'sans-serif'}}>
      {status}
    </Badge>
  );
};

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
  const [orders] = useState(INITIAL_ORDERS);
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

  // --- RENDER CONTENT BASED ON VIEW ---
  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
      case 'Orders': {
        const isDashboard = currentView === 'Dashboard';
        const filteredOrders = orders.filter(o => orderFilter === 'All' || o.status === orderFilter);
        
        return (
          <div className="animate-fade-in" style={{fontFamily: 'sans-serif'}}>
            {/* Dynamic Header */}
            <div className="mb-4">
               <h3 className="fw-bold mb-1">{isDashboard ? 'Dashboard Overview' : `${orderFilter} Orders`}</h3>
               <p className="text-muted">{todayDate}</p>
            </div>

            {/* Top Row: Charts & Stats (Only show on Dashboard view) */}
            {isDashboard && (
              <Row className="g-4 mb-4">
                <Col lg={8}>
                  <Card className="border-0 shadow-sm h-100 rounded-4">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="fw-bold mb-0">Revenue Report</h6>
                        {/* Working Chart Filter Buttons */}
                        <ButtonGroup size="sm">
                           <Button variant={chartRange === '1M' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('1M')}>1M</Button>
                           <Button variant={chartRange === '6M' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('6M')}>6M</Button>
                           <Button variant={chartRange === '1Y' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('1Y')}>1Y</Button>
                        </ButtonGroup>
                      </div>
                      <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={CHART_DATA[chartRange]}>
                            <defs>
                              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                            <Area type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorVal)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <div className="d-flex flex-column gap-3 h-100">
                    <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4">
                      <p className="text-muted small fw-bold text-uppercase mb-1">Total Earnings</p>
                      <h2 className="fw-bold mb-2 text-dark" style={{fontFamily: 'sans-serif'}}>$238,485</h2>
                      <small className="text-success fw-bold"><i className="fas fa-arrow-up me-1"></i>+14% vs last month</small>
                    </Card>
                    <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4">
                      <p className="text-muted small fw-bold text-uppercase mb-1">Total Orders</p>
                      <h2 className="fw-bold mb-2 text-dark" style={{fontFamily: 'sans-serif'}}>84,382</h2>
                      <small className="text-success fw-bold"><i className="fas fa-arrow-up me-1"></i>+36% vs last year</small>
                    </Card>
                  </div>
                </Col>
              </Row>
            )}

            {/* Orders Table */}
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Header className="bg-white p-4 border-bottom-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">{isDashboard ? 'Recent Orders' : 'Order List'}</h5>
              </Card.Header>
              <Table responsive hover className="m-0 align-middle table-borderless">
                <thead className="bg-light text-muted small text-uppercase fw-bold border-bottom">
                  <tr>
                    <th className="py-3 ps-4">Order ID</th>
                    <th>Date & Time</th>
                    <th>Client Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <tr key={order.id} className="border-bottom">
                      <td className="fw-bold ps-4 text-secondary">#{order.id}</td>
                      <td>
                         <div className="fw-bold text-dark">{order.date}</div>
                         <small className="text-muted">{order.time}</small>
                      </td>
                      <td className="fw-bold text-dark">{order.client}</td>
                      <td className="fw-bold text-dark">${order.amount.toLocaleString()}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td className="text-center">
                         {/* Working View Button */}
                         <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="rounded-pill px-3 fw-bold bg-white"
                            onClick={() => setSelectedOrder(order)}
                         >
                           <Eye size={14} className="me-1"/> View
                         </Button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={6} className="text-center p-5 text-muted">No orders found for this filter.</td></tr>}
                </tbody>
              </Table>
            </Card>
          </div>
        );
      }

      // ... Rest of the cases remain structurally the same but font applied ...
      case 'Services':
        return (
          <div style={{fontFamily: 'sans-serif'}}>
            <div className="d-flex justify-content-between mb-4 align-items-center">
               <h3 className="fw-bold m-0">Manage Services</h3>
               <Button onClick={() => { setModalType('Service'); setShowAddModal(true); }} className="d-flex align-items-center gap-2 rounded-pill"><Plus size={18}/> Add Service</Button>
            </div>
            <Row className="g-4">
              {services.map(s => (
                <Col md={4} key={s.id}>
                  <Card className="border-0 shadow-sm h-100 rounded-4">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between mb-2">
                        <h5 className="fw-bold text-dark">{s.name}</h5>
                        <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(s.id, 'Service')}><Trash2 size={18}/></Button>
                      </div>
                      <Badge bg="light" text="secondary" className="mb-4">{s.category}</Badge>
                      <h3 className="text-primary fw-bold mb-0">{s.price}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
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
    <div className="d-flex bg-light min-vh-100 font-sans text-dark">
      
      {/* SIDEBAR */}
      <div className="bg-white border-end d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2 text-primary" style={{ letterSpacing: '-0.5px', fontFamily: 'sans-serif' }}>
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
              <div className="d-flex gap-2 justify-content-end mt-4">
                 <Button variant="outline-danger" className="rounded-pill px-4">Cancel Order</Button>
                 <Button variant="primary" className="rounded-pill px-4">Edit Details</Button>
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