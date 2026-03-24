import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Plus, Trash2 } from 'lucide-react';

const ServicesView = ({ services, onAddClick, onDelete }) => {
  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <div className="d-flex justify-content-between mb-4 align-items-center">
         <h3 className="fw-bold m-0">Manage Services</h3>
         <Button onClick={onAddClick} className="d-flex align-items-center gap-2 rounded-pill">
           <Plus size={18}/> Add Service
         </Button>
      </div>
      <Row className="g-4">
        {services.map(s => (
          <Col md={4} key={s.id}>
            <Card className="border-0 shadow-sm h-100 rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold text-dark">{s.name}</h5>
                  <Button variant="link" className="text-danger p-0" onClick={() => onDelete(s.id)}>
                    <Trash2 size={18}/>
                  </Button>
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
};

export default ServicesView;
