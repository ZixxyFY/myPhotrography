import React, { useState } from 'react';
import { 
  Row, Col, Nav, Table, Card, Badge, Form, Button, 
  Collapse, Modal, Container 
} from 'react-bootstrap';
import { 
  LayoutDashboard, ShoppingCart, Camera, Users, Package, Calendar, 
  Image as ImageIcon, CreditCard, Settings, ChevronDown, 
  ChevronRight, Bell, Menu, MoreVertical, Plus, Trash2 
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- 1. MOCK DATA ---
const INITIAL_ORDERS = [
  { id: '12478', date: '2024-08-12', client: 'Janet Adebayo', amount: 25000, status: 'Completed', location: 'Manchester' },
  { id: '24587', date: '2024-08-14', client: 'James Smith', amount: 15200, status: 'Confirmed', location: 'London' },
  { id: '45789', date: '2024-08-15', client: 'Robert Doe', amount: 8500, status: 'New', location: 'Leeds' },
  { id: '99887', date: '2024-08-16', client: 'Alice Brown', amount: 0, status: 'Cancelled', location: 'Liverpool' },
];

const INITIAL_SERVICES = [
  { id: 1, name: 'Wedding Photography', price: '$2000', category: 'Wedding' },
  { id: 2, name: 'Portrait Session', price: '$300', category: 'Portrait' },
];

const INITIAL_STUDIOS = [
  { id: 1, name: 'Downtown Loft', location: '123 Main St', capacity: 10 },
  { id: 2, name: 'Garden Studio', location: '456 Oak Ln', capacity: 25 },
];

// --- 2. HELPER COMPONENTS ---
const StatusBadge = ({ status }) => {
  let variant = 'secondary';
  if (status === 'Completed') variant = 'success';
  if (status === 'Confirmed') variant = 'info';
  if (status === 'New' || status === 'Wait for Approval') variant = 'warning';
  if (status === 'Cancelled' || status === 'Expired') variant = 'danger';
  
  return (
    <Badge bg={`${variant}-subtle`} text={variant === 'light' ? 'dark' : variant} className="px-3 py-2 rounded-pill fw-bold">
      {status}
    </Badge>
  );
};

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu, isOpen, onClick, children }) => (
  <>
    <div 
      onClick={onClick} 
      className={`sidebar-link d-flex justify-content-between align-items-center ${active ? 'active' : ''}`} 
      style={{
        cursor: 'pointer', 
        padding: '12px 16px', 
        borderRadius: '8px', 
        color: active ? '#0ea5e9' : '#64748b', 
        backgroundColor: active ? '#e0f2fe' : 'transparent',
        marginBottom: '4px',
        transition: 'all 0.2s ease'
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <Icon size={20} strokeWidth={1.5} />
        <span className="fw-medium" style={{ fontSize: '0.95rem' }}>{label}</span>
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
const FullPhotographyAdmin = () => {
  // Global State
  const [currentView, setCurrentView] = useState('Dashboard');
  const [orderFilter, setOrderFilter] = useState('All');
  
  // Data State
  const [orders] = useState(INITIAL_ORDERS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [studios, setStudios] = useState(INITIAL_STUDIOS);
  
  // UI State
  const [openMenus, setOpenMenus] = useState({ orders: true, services: false });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [newItemName, setNewItemName] = useState('');

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
    setShowModal(false);
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
        return (
          <div className="animate-fade-in">
             <Row className="g-4 mb-4">
                <Col lg={8}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <h6 className="fw-bold mb-4">Order Report</h6>
                      <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[{n:'J',v:20}, {n:'F',v:40}, {n:'M',v:30}, {n:'A',v:70}, {n:'M',v:50}]}>
                            <defs>
                              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="n" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorVal)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card className="border-0 shadow-sm p-4 h-100 bg-primary text-white">
                    <h3 className="fw-bold mb-0">$238,485</h3>
                    <small>Total Earnings</small>
                    <hr className="my-4"/>
                    <h3 className="fw-bold mb-0">84,382</h3>
                    <small>Total Orders</small>
                  </Card>
                </Col>
              </Row>
          </div>
        );

      case 'Orders': {
        const filteredOrders = orders.filter(o => orderFilter === 'All' || o.status === orderFilter);
        return (
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3 border-bottom-0">
              <h5 className="mb-0 fw-bold">{orderFilter} Orders</h5>
            </Card.Header>
            <Table responsive hover className="m-0 align-middle">
              <thead className="bg-light text-muted small text-uppercase">
                <tr><th className="border-0 ps-4">ID</th><th className="border-0">Client</th><th className="border-0">Date</th><th className="border-0">Location</th><th className="border-0">Amount</th><th className="border-0">Status</th><th className="border-0">Action</th></tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="fw-bold ps-4">#{order.id}</td>
                    <td>{order.client}</td>
                    <td className="text-muted">{order.date}</td>
                    <td>{order.location}</td>
                    <td className="fw-bold">${order.amount.toLocaleString()}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>
                       <Button variant="light" size="sm" className="border"><MoreVertical size={14}/></Button>
                    </td>
                  </tr>
                )) : <tr><td colSpan={7} className="text-center p-5 text-muted">No orders found.</td></tr>}
              </tbody>
            </Table>
          </Card>
        );
      }

      case 'Services':
        return (
          <div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
               <h3 className="fw-bold m-0">Services</h3>
               <Button onClick={() => { setModalType('Service'); setShowModal(true); }} className="d-flex align-items-center gap-2"><Plus size={18}/> Add Service</Button>
            </div>
            <Row className="g-4">
              {services.map(s => (
                <Col md={4} key={s.id}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">{s.name}</h5>
                        <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(s.id, 'Service')}><Trash2 size={16}/></Button>
                      </div>
                      <p className="text-muted mb-3">{s.category}</p>
                      <h4 className="text-primary fw-bold mb-0">{s.price}</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );

      case 'Studios':
        return (
          <div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
               <h3 className="fw-bold m-0">Studios</h3>
               <Button onClick={() => { setModalType('Studio'); setShowModal(true); }} className="d-flex align-items-center gap-2"><Plus size={18}/> Add Studio</Button>
            </div>
            <Row className="g-4">
              {studios.map(s => (
                <Col md={6} key={s.id}>
                   <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">{s.name}</h5>
                        <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(s.id, 'Studio')}><Trash2 size={16}/></Button>
                      </div>
                      <div className="text-muted mb-3 d-flex align-items-center gap-2"><Camera size={14}/> {s.location}</div>
                      <Badge bg="info-subtle" text="info-emphasis" className="px-3 py-2">Capacity: {s.capacity} people</Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );

      case 'Availability':
        return (
          <Card className="border-0 shadow-sm p-4">
            <h4 className="mb-4 fw-bold">Calendar Availability</h4>
            <div className="d-flex flex-wrap gap-2">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`border rounded p-3 d-flex flex-column justify-content-between ${i % 7 === 0 ? 'bg-light text-muted' : 'bg-white'}`} style={{width: '100px', height: '100px'}}>
                  <div className="fw-bold">{i + 1}</div>
                  {i % 5 === 0 && <Badge bg="success-subtle" text="success" className="text-uppercase" style={{fontSize: '0.6rem'}}>Open</Badge>}
                  {i % 4 === 0 && <Badge bg="danger-subtle" text="danger" className="text-uppercase" style={{fontSize: '0.6rem'}}>Booked</Badge>}
                </div>
              ))}
            </div>
          </Card>
        );

      case 'Settings':
        return (
          <Card className="border-0 shadow-sm p-5 mx-auto" style={{maxWidth: '800px'}}>
            <h4 className="mb-4 fw-bold">Profile Settings</h4>
            <Form>
              <Row className="mb-3">
                <Col><Form.Label>First Name</Form.Label><Form.Control defaultValue="Janet" /></Col>
                <Col><Form.Label>Last Name</Form.Label><Form.Control defaultValue="Adebayo" /></Col>
              </Row>
              <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control defaultValue="janet@photography.com" /></Form.Group>
              <Form.Group className="mb-4"><Form.Label>Studio Name</Form.Label><Form.Control defaultValue="LensMaster Studio" /></Form.Group>
              <Button variant="primary" className="px-4">Save Changes</Button>
            </Form>
          </Card>
        );

      default:
        return <div className="p-5 text-center text-muted"><h3>{currentView}</h3><p>This module is under construction.</p></div>;
    }
  };

  return (
    <div className="d-flex bg-light min-vh-100 font-sans text-dark">
      
      {/* SIDEBAR */}
      <div className="bg-white border-end d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2 text-primary" style={{ letterSpacing: '-0.5px' }}>
            <Camera size={28} /> LensDash
          </h4>
        </div>
        
        <Nav className="flex-column px-3 pb-5 gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'Dashboard'} onClick={() => handleNavClick('Dashboard')} />

          <SidebarItem icon={ShoppingCart} label="Orders" hasSubmenu isOpen={openMenus.orders} onClick={() => toggleMenu('orders')}>
            <div className="ms-4 ps-3 border-start py-1">
              <div className="p-2 small text-muted cursor-pointer hover-text-primary rounded" onClick={() => handleNavClick('Orders', 'New')}>New Orders</div>
              <div className="p-2 small text-muted cursor-pointer hover-text-primary rounded" onClick={() => handleNavClick('Orders', 'Confirmed')}>Confirmed Orders</div>
              <div className="p-2 small text-muted cursor-pointer hover-text-primary rounded" onClick={() => handleNavClick('Orders', 'Completed')}>Completed Orders</div>
              <div className="p-2 small text-muted cursor-pointer hover-text-primary rounded" onClick={() => handleNavClick('Orders', 'Cancelled')}>Cancelled Orders</div>
            </div>
          </SidebarItem>

          <SidebarItem icon={Package} label="Services" hasSubmenu isOpen={openMenus.services} onClick={() => toggleMenu('services')}>
             <div className="ms-4 ps-3 border-start py-1">
               <div className="p-2 small text-muted cursor-pointer hover-text-primary rounded" onClick={() => handleNavClick('Services')}>All Services</div>
             </div>
          </SidebarItem>

          <SidebarItem icon={Users} label="Studios" onClick={() => handleNavClick('Studios')} />
          <SidebarItem icon={Calendar} label="Availability" onClick={() => handleNavClick('Availability')} />
          <SidebarItem icon={ImageIcon} label="Portfolio" onClick={() => handleNavClick('Portfolio')} />
          <SidebarItem icon={CreditCard} label="Payment" onClick={() => handleNavClick('Payment')} />
          
          <div className="mt-4 mb-2 text-muted small px-3 fw-bold text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>Settings</div>
          <SidebarItem icon={Settings} label="Profile" onClick={() => handleNavClick('Settings')} />
        </Nav>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-grow-1 d-flex flex-column" style={{overflowX: 'hidden'}}>
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" style={{zIndex: 100, height: '70px'}}>
          <div className="d-flex align-items-center gap-3">
            <Button variant="light" className="d-lg-none"><Menu size={20}/></Button>
            <div>
              <h5 className="m-0 fw-bold">{currentView}</h5>
              <small className="text-muted d-none d-md-block">Thursday, 23 November, 2023</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
             <Button variant="light" className="rounded-circle p-2 position-relative">
               <Bell size={20} className="text-secondary"/>
               <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
             </Button>
             <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style={{width: 38, height: 38}}>JA</div>
          </div>
        </header>

        <Container fluid className="p-4">
          {renderContent()}
        </Container>
      </div>

      {/* MODAL FOR ADDING ITEMS */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add New {modalType}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder={`Enter ${modalType} Name`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddItem}>Add {modalType}</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default FullPhotographyAdmin;