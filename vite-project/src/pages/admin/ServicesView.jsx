import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Plus, Trash2 } from 'lucide-react';

const ServicesView = ({ services, onAddClick, onDelete }) => {
  return (
    <div style={{fontFamily: "'Montserrat', sans-serif"}}>
      <div className="d-flex justify-content-between mb-4 align-items-center">
         <h3 className="fw-bold m-0" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>Manage Services</h3>
         <Button onClick={onAddClick} className="d-flex align-items-center gap-2 rounded-pill border-0 px-4 fw-bold" style={{backgroundColor: '#C5A059', color: '#1A1A1B'}}>
           <Plus size={18}/> Add Service
         </Button>
      </div>
      <Row className="g-4">
        {services.map(s => (
          <Col md={4} key={s.id}>
            <Card className="border-0 shadow-sm h-100 rounded-4" style={{backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>{s.name}</h5>
                  <Button variant="link" className="p-0" style={{color: 'rgba(220, 53, 69, 0.8)'}} onClick={() => onDelete(s.id)}>
                    <Trash2 size={18}/>
                  </Button>
                </div>
                <Badge className="mb-4" style={{backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#A0A0A0', border: '1px solid rgba(197, 160, 89, 0.2)'}}>{s.category}</Badge>
                <h3 className="fw-bold mb-0" style={{color: '#C5A059'}}>{s.price}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesView;