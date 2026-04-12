import React, { useState } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Check, ArrowRight, ArrowLeft, X } from 'lucide-react';

const PACKAGES = [
  { id: 'essential', name: 'The Essential', price: 1500, desc: 'Perfect for intimate portraits and small events.', features: ['4 HOURS COVERAGE', '100 EDITED PHOTOS', 'ONLINE GALLERY', 'PRINT RIGHTS'] },
  { id: 'prestige', name: 'The Prestige', price: 3500, desc: 'Our most popular choice for weddings and large events.', features: ['8 HOURS COVERAGE', '300 EDITED PHOTOS', 'ONLINE GALLERY', 'ENGAGEMENT SESSION', 'LUXURY ALBUM'] },
  { id: 'couture', name: 'The Couture', price: 6000, desc: 'The ultimate luxury experience for high-end productions.', features: ['FULL DAY COVERAGE', 'UNLIMITED PHOTOS', 'ONLINE GALLERY', '2 PHOTOGRAPHERS', 'HANDCRAFTED ITALIAN ALBUM', 'DRONE COVERAGE'] }
];

const BookingWizard = ({ show, onHide, initialPackage = null }) => {
  const [step, setStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState(initialPackage || 'prestige');
  const [formData, setFormData] = useState({ fullName: '', email: '', date: '', location: '', notes: '' });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); 
  };

  const resetAndHide = () => {
    setStep(1);
    onHide();
  };

  return (
    <>
      {/* INJECTED CSS TO OVERRIDE BOOTSTRAP DEFAULTS */}
      <style>
        {`
          .wizard-modal .modal-content {
            background-color: transparent !important;
            border: none !important;
          }
          
          /* FIX: Override the theme.css dark text forcing */
          .wizard-modal .modal-title,
          .wizard-modal h2,
          .wizard-modal h4,
          .wizard-modal h5,
          .wizard-modal p,
          .wizard-modal li {
             color: #F5F5F7 !important;
          }
          
          /* FIX: Override the theme.css form label styles */
          .wizard-modal .form-label {
             color: #C5A059 !important;
             font-size: 0.75rem !important;
             letter-spacing: 1px !important;
             text-transform: uppercase !important;
          }

          .wizard-input::placeholder {
            color: rgba(245, 245, 247, 0.4) !important;
          }
          .wizard-input:focus {
            border-color: #C5A059 !important;
            box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.25) !important;
            background-color: #1A1A1B !important;
            color: #F5F5F7 !important;
          }
          
          /* Removes the default webkit calendar icon color so it shows up in dark mode */
          ::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}
      </style>

      <Modal show={show} onHide={resetAndHide} centered size="xl" dialogClassName="wizard-modal">
        <div style={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '16px', padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          
          {/* CLOSE BUTTON */}
          <button 
            onClick={resetAndHide} 
            style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#F5F5F7', cursor: 'pointer', padding: '4px' }}
          >
            <X size={24} />
          </button>

          {/* HEADER & STEPPER */}
          <div className="text-center mb-5">
            <p className="small fw-bold text-uppercase mb-2" style={{ color: '#C5A059', letterSpacing: '3px' }}>Booking</p>
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>Reserve Your Session</h2>
            
            <div className="d-flex justify-content-center align-items-center gap-3 relative">
               <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{ width: 32, height: 32, backgroundColor: step >= 1 ? '#C5A059' : '#242426', color: step >= 1 ? '#1A1A1B' : '#F5F5F7', zIndex: 2 }}>{step > 1 ? <Check size={16}/> : '1'}</div>
               <div style={{ height: 2, width: 80, backgroundColor: step >= 2 ? '#C5A059' : '#242426' }}></div>
               <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{ width: 32, height: 32, backgroundColor: step >= 2 ? '#C5A059' : '#242426', color: step >= 2 ? '#1A1A1B' : '#F5F5F7', zIndex: 2 }}>{step > 2 ? <Check size={16}/> : '2'}</div>
               <div style={{ height: 2, width: 80, backgroundColor: step >= 3 ? '#C5A059' : '#242426' }}></div>
               <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{ width: 32, height: 32, backgroundColor: step >= 3 ? '#C5A059' : '#242426', color: step >= 3 ? '#1A1A1B' : '#F5F5F7', zIndex: 2 }}>3</div>
            </div>
          </div>

          {/* STEP 1: PACKAGES */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h4 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Select a Package</h4>
              <Row className="g-4 mb-5">
                {PACKAGES.map(pkg => (
                  <Col md={4} key={pkg.id}>
                    <div 
                      onClick={() => setSelectedPkg(pkg.id)}
                      style={{ 
                        backgroundColor: selectedPkg === pkg.id ? 'rgba(197, 160, 89, 0.05)' : '#242426', 
                        border: selectedPkg === pkg.id ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '12px', padding: '2rem', cursor: 'pointer', height: '100%',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h5 style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.name}</h5>
                      <h2 style={{ color: '#C5A059', marginBottom: '1rem' }}>${pkg.price.toLocaleString()}</h2>
                      <p style={{ fontSize: '0.9rem', minHeight: '60px', lineHeight: '1.5' }}>{pkg.desc}</p>
                      <ul className="list-unstyled mt-4 gap-2 d-flex flex-column">
                        {pkg.features.map((feat, i) => (
                          <li key={i} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={14} color="#C5A059" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-end">
                <button onClick={handleNext} className="rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: '#C5A059', color: '#1A1A1B', border: 'none', cursor: 'pointer' }}>
                  CONTINUE <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div className="animate-fade-in mx-auto" style={{ maxWidth: '800px' }}>
              <h4 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Your Details</h4>
              <Form onSubmit={handleSubmit}>
                <Row className="g-4 mb-5">
                  <Col md={6}>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', color: '#F5F5F7' }} className="py-2 wizard-input" placeholder="John Doe" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', color: '#F5F5F7' }} className="py-2 wizard-input" placeholder="john@example.com" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Preferred Date</Form.Label>
                    <Form.Control required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', color: '#F5F5F7' }} className="py-2 wizard-input" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', color: '#F5F5F7' }} className="py-2 wizard-input" placeholder="City, Venue, or TBD" />
                  </Col>
                  <Col md={12}>
                    <Form.Label>Message / Special Requests</Form.Label>
                    <Form.Control as="textarea" rows={4} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Tell us about your vision..." style={{ backgroundColor: '#242426', border: '1px solid rgba(197,160,89,0.3)', color: '#F5F5F7' }} className="py-2 wizard-input" />
                  </Col>
                </Row>
                <div className="d-flex justify-content-between">
                  <button type="button" onClick={handleBack} className="fw-bold d-flex align-items-center gap-2" style={{ color: '#F5F5F7', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={18}/> BACK
                  </button>
                  <button type="submit" className="rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" style={{ backgroundColor: '#C5A059', color: '#1A1A1B', border: 'none', cursor: 'pointer' }}>
                    REVIEW BOOKING <ArrowRight size={18}/>
                  </button>
                </div>
              </Form>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="animate-fade-in text-center py-5">
              <div className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 80, height: 80, backgroundColor: 'rgba(197, 160, 89, 0.1)', border: '2px solid #C5A059' }}>
                 <Check size={40} color="#C5A059" />
              </div>
              <h2 className="mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Request Sent</h2>
              <p className="mb-5 mx-auto" style={{ maxWidth: '400px', lineHeight: '1.6' }}>Thank you for choosing E-Imagination. Our team will review your request and contact you within 24 hours to finalize the details.</p>
              <button onClick={resetAndHide} className="rounded-pill px-5 py-2 fw-bold" style={{ backgroundColor: '#C5A059', color: '#1A1A1B', border: 'none', cursor: 'pointer' }}>
                RETURN HOME
              </button>
            </div>
          )}

        </div>
      </Modal>
    </>
  );
};

export default BookingWizard;