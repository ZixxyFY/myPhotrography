import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Mock Data for Rental Items
const rentalItems = [
  // --- CAMERAS ---
  { id: 1, name: "Canon EOS R5 Body", price: "2,500", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60" },
  { id: 2, name: "Sony A7 III", price: "2,000", image: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?auto=format&fit=crop&w=500&q=60" },
  
  // --- DRONES & ACTION ---
  { id: 6, name: "GoPro Hero 10", price: "600", image: "https://images.unsplash.com/photo-1564463836205-aca312724fd1?auto=format&fit=crop&w=500&q=60" },
  { id: 7, name: "DJI Mavic 3 Cine", price: "3,500", image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=500&q=60" },

  // --- LENSES ---
  { id: 5, name: "Sigma 85mm f/1.4 Art", price: "900", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=60" },
  { id: 8, name: "Sony 24-70mm GM", price: "1,200", image: "https://images.unsplash.com/photo-1616423664033-bb6872901c7b?auto=format&fit=crop&w=500&q=60" },
  { id: 9, name: "Canon RF 70-200mm", price: "1,400", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=60" },

  // --- STABILIZERS & GIMBALS ---
  { id: 3, name: "DJI Ronin-S Gimbal", price: "800", image: "https://images.unsplash.com/photo-1533649725832-72367d26b488?auto=format&fit=crop&w=500&q=60" },
  
  // --- LIGHTING & AUDIO ---
  { id: 4, name: "Godox AD200 Pro", price: "500", image: "https://images.unsplash.com/photo-1587304673646-60e42d7a2283?auto=format&fit=crop&w=500&q=60" },
  { id: 10, name: "Aputure 120d II Light", price: "1,500", image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=500&q=60" },
  { id: 11, name: "Rode Wireless GO II", price: "600", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=500&q=60" },
  
  // --- ACCESSORIES ---
  { id: 12, name: "Manfrotto Tripod", price: "400", image: "https://images.unsplash.com/photo-1534234828563-025313a968a5?auto=format&fit=crop&w=500&q=60" }
];

class RentalShop extends Component {
  handleRent = (itemName) => {
    alert(`Request to rent ${itemName} sent! We will contact you shortly.`);
  }

  render() {
    const { onBack } = this.props;

    return (
      <div className="bg-light min-vh-100">
        {/* Simple Shop Navbar */}
        <nav className="navbar navbar-dark bg-black sticky-top shadow-sm">
          <div className="container">
            <span className="navbar-brand mb-0 h1 fw-bold">
              <i className="fas fa-camera-retro me-2 text-gold"></i>Rental Store
            </span>
            <button onClick={onBack} className="btn btn-outline-light btn-sm rounded-pill">
              <i className="fas fa-arrow-left me-2"></i>Back to Home
            </button>
          </div>
        </nav>

        {/* Shop Header */}
        <div className="bg-white py-5 text-center shadow-sm mb-5">
          <div className="container">
            <h1 className="fw-bold display-5">Gear Up</h1>
            <p className="text-muted lead">Premium photography equipment available for daily rental.</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container pb-5">
          <div className="row g-4">
            {rentalItems.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div style={{height: '200px', overflow: 'hidden'}}>
                     {/* Added transition for hover effect if you add CSS for it later */}
                     <img 
                        src={item.image} 
                        className="card-img-top" 
                        alt={item.name} 
                        style={{objectFit: 'cover', height: '100%', width: '100%'}} 
                     />
                  </div>
                  <div className="card-body text-center p-4">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <h6 className="text-gold fw-bold mb-3">₹{item.price} / day</h6>
                    <button 
                      onClick={() => this.handleRent(item.name)}
                      className="btn btn-dark w-100 rounded-pill"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

RentalShop.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default RentalShop;