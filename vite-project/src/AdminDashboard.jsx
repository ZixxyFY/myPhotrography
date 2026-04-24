import React, { useState } from 'react';
import { 
  Row, Col, Table, Card, Badge, Form, Button, 
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
  let style = { backgroundColor: 'transparent', color: '#F5F5F7', border: '1px solid rgba(197, 160, 89, 0.3)' };
  if (status === 'Completed') style = { backgroundColor: 'rgba(197, 160, 89, 0.4)', color: '#F5F5F7' };
  if (status === 'Confirmed') style = { backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#F5F5F7' };
  if (status === 'New' || status === 'Wait for Approval') style = { backgroundColor: 'rgba(197, 160, 89, 0.8)', color: '#1A1A1B' };
  if (status === 'Cancelled' || status === 'Expired') style = { backgroundColor: 'rgba(220, 53, 69, 0.2)', color: '#F5F5F7', border: '1px solid rgba(220, 53, 69, 0.5)' };
  
  return (
    <Badge style={style} className="px-3 py-2 rounded-pill fw-bold">
      {status}
    </Badge>
  );
};

const SidebarItem = ({ icon: IconComponent, label, active, hasSubmenu, isOpen, onClick, children }) => (
  <>
    <div 
      onClick={onClick} 
      className={"sidebar-link d-flex justify-content-between align-items-center"} 
      style={{
        cursor: 'pointer', 
        padding: '12px 16px', 
        borderRadius: '8px', 
        color: active ? '#C5A059' : '#A0A0A0', 
        backgroundColor: active ? 'rgba(197, 160, 89, 0.2)' : 'transparent',
        marginBottom: '4px',
        transition: 'all 0.2s ease',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <div className="d-flex align-items-center gap-3">
        {IconComponent && <IconComponent size={20} strokeWidth={1.5} color={active ? '#C5A059' : '#A0A0A0'} />}
        <span className="fw-medium" style={{ fontSize: '0.95rem' }}>{label}</span>
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
                  <Card style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '12px' }} className="h-100">
                    <Card.Body>
                      <h6 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Dashboard Overview</h6>
                      <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[{n:'J',v:20}, {n:'F',v:40}, {n:'M',v:30}, {n:'A',v:70}, {n:'M',v:50}]}>
                            <defs>
                              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgba(197, 160, 89, 0.4)" stopOpacity={1}/>
                                <stop offset="95%" stopColor="rgba(197, 160, 89, 0.05)" stopOpacity={1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(197,160,89,0.1)" />
                            <XAxis dataKey="n" axisLine={false} tickLine={false} stroke="#A0A0A0" style={{ fontFamily: "'Montserrat', sans-serif" }} />
                            <Tooltip contentStyle={{ backgroundColor: '#242426', borderColor: 'rgba(197,160,89,0.3)', color: '#F5F5F7' }} itemStyle={{ color: '#C5A059' }} />
                            <Area type="monotone" dataKey="v" stroke="#C5A059" strokeWidth={3} fill="url(#colorVal)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '12px', color: '#C5A059' }} className="p-4 h-100">
                    <h3 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>$238,485</h3>
                    <small style={{ color: '#F5F5F7' }}>Total Earnings</small>
                    <hr className="my-4" style={{ borderColor: 'rgba(197,160,89,0.3)' }}/>
                    <h3 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>84,382</h3>
                    <small style={{ color: '#F5F5F7' }}>Total Orders</small>
                  </Card>
                </Col>
              </Row>
          </div>
        );

      case 'Orders': {
        const filteredOrders = orders.filter(o => orderFilter === 'All' || o.status === orderFilter);
        return (
          <Card style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '12px' }}>
            <Card.Header className="py-3 border-bottom-0" style={{ backgroundColor: 'transparent' }}>
              <h5 className="mb-0 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>{orderFilter} Orders</h5>
            </Card.Header>
            <Table responsive className="m-0 align-middle" style={{ color: '#F5F5F7' }}>
              <thead className="small text-uppercase" style={{ backgroundColor: 'rgba(197, 160, 89, 0.05)', color: '#A0A0A0' }}>
                <tr><th className="border-0 ps-4">ID</th><th className="border-0">Client</th><th className="border-0">Date</th><th className="border-0">Location</th><th className="border-0">Amount</th><th className="border-0">Status</th><th className="border-0">Action</th></tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
                    <td className="fw-bold ps-4" style={{ color: '#C5A059' }}>#{order.id}</td>
                    <td>{order.client}</td>
                    <td style={{ color: '#A0A0A0' }}>{order.date}</td>
                    <td>{order.location}</td>
                    <td className="fw-bold">$${order.amount.toLocaleString()}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>
                       <Button size="sm" style={{ backgroundColor: 'transparent', border: '1px solid rgba(197,160,89,0.3)', color: '#C5A059' }}><MoreVertical size={14}/></Button>
                    </td>
                  </tr>
                )) : <tr><td colSpan={7} className="text-center p-5 border-0" style={{ color: '#A0A0A0' }}>No orders found.</td></tr>}
              </tbody>
            </Table>
          </Card>
        );
      }

      case 'Services':
        return (
          <div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
               <h3 className="fw-bold m-0" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Services</h3>
               <Button onClick={() => { setModalType('Service'); setShowModal(true); }} className="d-flex align-items-center gap-2 rounded-pill border-0 fw-bold px-4 py-2" style={{ backgroundColor: '#C5A059', color: '#1A1A1B' }}><Plus size={18}/> Add Service</Button>
            </div>
            <Row className="g-4">
              {services.map(s => (
                <Col md={4} key={s.id}>
                  <Card className="h-100" style={{ backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '12px' }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>{s.name}</h5>
                        <Button variant="link" className="p-0" style={{ color: 'rgba(220, 53, 69, 0.8)' }} onClick={() => handleDelete(s.id, 'Service')}><Trash2 size={16}/></Button>
                      </div>
                      <p className="mb-3" style={{ color: '#A0A0A0' }}>{s.category}</p>
                      <h4 className="fw-bold mb-0" style={{ color: '#C5A059' }}>{s.price}</h4>
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
               <h3 className="fw-bold m-0" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Studios</h3>
               <Button onClick={() => { setModalType('Studio'); setShowModal(true); }} className="d-flex align-items-center gap-2 rounded-pill border-0 fw-bold px-4 py-2" style={{ backgroundColor: '#C5A059', color: '#1A1A1B' }}><Plus size={18}/> Add Studio</Button>
            </div>
            <Row className="g-4">
              {studios.map(s => (
                <Col md={6} key={s.id}>
                   <Card style={{ backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '12px' }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>{s.name}</h5>
                        <Button variant="link" className="p-0" style={{ color: 'rgba(220, 53, 69, 0.8)' }} onClick={() => handleDelete(s.id, 'Studio')}><Trash2 size={16}/></Button>
                      </div>
                      <div className="mb-3 d-flex align-items-center gap-2" style={{ color: '#A0A0A0' }}><Camera size={14}/> {s.location}</div>
                      <Badge className="px-3 py-2" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#C5A059', border: '1px solid rgba(197, 160, 89, 0.3)' }}>Capacity: {s.capacity} people</Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );

      case 'Availability':
        return (
          <Card className="p-4" style={{ backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '12px' }}>
            <h4 className="mb-4 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Calendar Availability</h4>
            <div className="d-flex flex-wrap gap-2">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={"rounded p-3 d-flex flex-column justify-content-between"} style={{ width: '100px', height: '100px', border: '1px solid rgba(197, 160, 89, 0.3)', backgroundColor: i % 7 === 0 ? 'rgba(0,0,0,0.2)' : 'transparent', color: i % 7 === 0 ? '#A0A0A0' : '#F5F5F7' }}>
                  <div className="fw-bold">{i + 1}</div>
                  {i % 5 === 0 && <Badge className="text-uppercase" style={{ fontSize: '0.6rem', backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#C5A059' }}>Open</Badge>}
                  {i % 4 === 0 && <Badge className="text-uppercase" style={{ fontSize: '0.6rem', backgroundColor: 'rgba(220, 53, 69, 0.2)', color: '#F5F5F7' }}>Booked</Badge>}
                </div>
              ))}
            </div>
          </Card>
        );

      case 'Settings':
        return (
          <Card className="p-5 mx-auto" style={{ maxWidth: '800px', backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7', borderRadius: '12px' }}>
            <h4 className="mb-4 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Profile Settings</h4>
            <Form>
              <Row className="mb-3">
                <Col><Form.Label style={{ color: '#A0A0A0' }}>First Name</Form.Label><Form.Control defaultValue="Janet" style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7' }} className="shadow-none focus-ring focus-ring-warning" /></Col>
                <Col><Form.Label style={{ color: '#A0A0A0' }}>Last Name</Form.Label><Form.Control defaultValue="Adebayo" style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7' }} className="shadow-none focus-ring focus-ring-warning" /></Col>
              </Row>
              <Form.Group className="mb-3"><Form.Label style={{ color: '#A0A0A0' }}>Email</Form.Label><Form.Control defaultValue="janet@photography.com" style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7' }} className="shadow-none focus-ring focus-ring-warning" /></Form.Group>
              <Form.Group className="mb-4"><Form.Label style={{ color: '#A0A0A0' }}>Studio Name</Form.Label><Form.Control defaultValue="LensMaster Studio" style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7' }} className="shadow-none focus-ring focus-ring-warning" /></Form.Group>
              <Button className="px-4 rounded-pill border-0 fw-bold" style={{ backgroundColor: '#C5A059', color: '#1A1A1B' }}>Save Changes</Button>
            </Form>
          </Card>
        );

      default:
        return <div className="p-5 text-center" style={{ color: '#A0A0A0' }}><h3>{currentView}</h3><p>This module is under construction.</p></div>;
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#1A1A1B', color: '#F5F5F7', fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* SIDEBAR */}
      <div className="d-none d-lg-block sticky-top" style={{ width: '280px', height: '100vh', overflowY: 'auto', backgroundColor: 'rgba(26, 26, 27, 0.8)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(197, 160, 89, 0.1)' }}>
        <div className="p-4 mb-2">
          <h4 className="fw-bold d-flex align-items-center gap-2" style={{ letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif", color: '#C5A059' }}>
            <Camera size={28} /> E-imagination
          </h4>
        </div>
        
        <div className="d-flex flex-column px-3 pb-5 gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'Dashboard'} onClick={() => handleNavClick('Dashboard')} />

          <SidebarItem icon={ShoppingCart} label="Orders" hasSubmenu isOpen={openMenus.orders} onClick={() => toggleMenu('orders')}>
            <div className="ms-4 ps-3 py-1" style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.2)' }}>
              <div className="p-2 small cursor-pointer rounded" style={{ color: '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'New')}>New Orders</div>
              <div className="p-2 small cursor-pointer rounded" style={{ color: '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Confirmed')}>Confirmed Orders</div>
              <div className="p-2 small cursor-pointer rounded" style={{ color: '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Completed')}>Completed Orders</div>
              <div className="p-2 small cursor-pointer rounded" style={{ color: '#A0A0A0' }} onClick={() => handleNavClick('Orders', 'Cancelled')}>Cancelled Orders</div>
            </div>
          </SidebarItem>

          <SidebarItem icon={Package} label="Services" hasSubmenu isOpen={openMenus.services} onClick={() => toggleMenu('services')}>
             <div className="ms-4 ps-3 py-1" style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.2)' }}>
               <div className="p-2 small cursor-pointer rounded" style={{ color: '#A0A0A0' }} onClick={() => handleNavClick('Services')}>All Services</div>
             </div>
          </SidebarItem>

          <SidebarItem icon={Users} label="Studios" onClick={() => handleNavClick('Studios')} />
          <SidebarItem icon={Calendar} label="Availability" onClick={() => handleNavClick('Availability')} />
          <SidebarItem icon={ImageIcon} label="Portfolio" onClick={() => handleNavClick('Portfolio')} />
          <SidebarItem icon={CreditCard} label="Payment" onClick={() => handleNavClick('Payment')} />
          
          <div className="mt-4 mb-2 small px-3 fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', color: '#A0A0A0' }}>Settings</div>
          <SidebarItem icon={Settings} label="Profile" onClick={() => handleNavClick('Settings')} />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-grow-1 d-flex flex-column align-items-center" style={{ overflowX: 'hidden' }}>
        <header className="px-4 py-3 d-flex justify-content-between align-items-center w-100 sticky-top" style={{ zIndex: 100, height: '70px', backgroundColor: '#242426', borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
          <div className="d-flex align-items-center gap-3">
            <Button style={{ backgroundColor: 'transparent', border: 'none', color: '#C5A059' }} className="d-lg-none" onClick={() => {}}><Menu size={20}/></Button>
            <div>
              <h5 className="m-0 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>{currentView}</h5>
              <small className="d-none d-md-block" style={{ color: '#A0A0A0' }}>Thursday, 23 November, 2023</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
             <div className="position-relative d-flex align-items-center">
                <Form.Control 
                  placeholder="Search..." 
                  className="rounded-pill px-3 shadow-none focus-ring focus-ring-warning" 
                  style={{ 
                    backgroundColor: '#1A1A1B', 
                    border: '1px solid rgba(197, 160, 89, 0.3)', 
                    color: '#F5F5F7',
                    width: '200px',
                    fontSize: '0.9rem'
                  }} 
                />
             </div>
             <Button className="rounded-circle p-2 position-relative d-flex align-items-center justify-content-center" style={{ backgroundColor: 'transparent', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
               <Bell size={18} style={{ color: '#C5A059' }}/>
               <span className="position-absolute top-0 start-100 translate-middle p-1 rounded-circle" style={{ backgroundColor: 'rgba(220, 53, 69, 0.8)', border: '1px solid #242426' }}></span>
             </Button>
             <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 38, height: 38, backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#C5A059', border: '1px solid rgba(197, 160, 89, 0.5)' }}>JA</div>
          </div>
        </header>

        <Container fluid className="p-4 w-100" style={{ maxWidth: '1400px' }}>
          {renderContent()}
        </Container>
      </div>

      {/* MODAL FOR ADDING ITEMS */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="text-light" style={{ '--bs-modal-bg': '#242426' }}>
        <Modal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
            <Modal.Title style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>Add New {modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label style={{ color: '#A0A0A0' }}>Name</Form.Label>
          <Form.Control value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder={`Enter ${modalType} Name`} style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7' }} className="shadow-none focus-ring focus-ring-warning" />
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '0' }}>
          <Button variant="link" style={{ color: '#A0A0A0', textDecoration: 'none' }} onClick={() => setShowModal(false)}>Close</Button>
          <Button className="rounded-pill border-0 fw-bold px-4" style={{ backgroundColor: '#C5A059', color: '#1A1A1B' }} onClick={handleAddItem}>Add {modalType}</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default FullPhotographyAdmin;