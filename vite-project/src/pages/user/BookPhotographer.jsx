import React from 'react';
import Card from '../../components/Card';
import { MOCK_PHOTOGRAPHERS } from '../../data/mockPhotographers';

const BookPhotographer = () => {
  const handleBook = (name) => {
    alert(`Photographer ${name} booked successfully`);
  };

  return (
    <div className="fade-in">
      <h3 className="fw-bold mb-4">Book a Photographer</h3>
      <div className="row g-4">
        {MOCK_PHOTOGRAPHERS.map(p => (
          <div className="col-md-6" key={p.id}>
            <Card className="h-100">
              <div className="d-flex p-4 align-items-center">
                <img src={p.img} className="rounded-circle me-3" style={{width: '80px', height: '80px', objectFit: 'cover'}} alt={p.name} />
                <div>
                  <h5 className="fw-bold mb-1">{p.name}</h5>
                  <span className="badge bg-warning text-dark mb-2">{p.specialty}</span>
                  <div className="text-muted small mb-1">
                     <i className="fas fa-star text-warning me-1"></i> {p.rating}
                  </div>
                  <p className="mb-0 text-primary fw-bold text-muted small">{p.rate}</p>
                </div>
                <button 
                  className="btn btn-ds-primary ms-auto btn-sm rounded-pill px-4"
                  onClick={() => handleBook(p.name)}
                >
                  Book Now
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPhotographer;
