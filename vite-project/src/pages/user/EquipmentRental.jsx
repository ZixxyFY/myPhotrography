import React from 'react';
import Card from '../../components/Card';
import { MOCK_EQUIPMENT } from '../../data/mockEquipment';

const EquipmentRental = ({ onBack }) => {
  const handleRent = (itemName) => {
    alert(`Equipment ${itemName} added to rental cart`);
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Rent Equipment</h3>
        {onBack && (
          <button onClick={onBack} className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            <i className="fas fa-arrow-left me-2"></i>Back to Home
          </button>
        )}
      </div>
      <div className="row g-4">
        {MOCK_EQUIPMENT.map(e => (
          <div className="col-md-4 col-lg-3" key={e.id}>
            <Card className="h-100 overflow-hidden">
              <img src={e.image} className="card-img-top w-100" style={{height: '200px', objectFit: 'cover'}} alt={e.name} />
              <div className="card-body p-4 d-flex flex-column text-center">
                <h6 className="fw-bold mb-2">{e.name}</h6>
                <span className="fw-bold text-primary mb-3 text-warning">₹{e.price} / day</span>
                <button 
                  className="btn btn-ds-secondary w-100 mt-auto rounded-pill btn-sm"
                  onClick={() => handleRent(e.name)}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentRental;