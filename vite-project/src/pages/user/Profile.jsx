import React, { useState } from 'react';
import Card from '../../components/Card';
import FormInput from '../../components/FormInput';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(() => {
    let defaultProfile = {
      name: user || 'Client User',
      email: 'client@example.com',
      phone: '+1 234 567 8900',
      address: '123 Photography Lane, New York'
    };

    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fullName) defaultProfile.name = parsed.fullName;
        else if (parsed.name) defaultProfile.name = parsed.name;
        if (parsed.email) defaultProfile.email = parsed.email;
      }
    } catch(e) {
       // Ignore non-json or missing
    }
    return defaultProfile;
  });

  // Re-sync if the parent passes a new user prop
  React.useEffect(() => {
    setProfile(prev => ({...prev, name: user || prev.name}));
  }, [user]);

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value});
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully");
  };

  return (
    <div className="fade-in max-w-2xl mx-auto profile-form-container" style={{maxWidth: '800px'}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0 text-white" style={{fontFamily: "'Playfair Display', serif"}}>My Profile</h3>
        <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#C5A059', border: '1px solid rgba(197, 160, 89, 0.3)', letterSpacing: '1px' }}>
          <i className="fas fa-crown me-2"></i>Premium Member
        </span>
      </div>

      {/* Styled inputs for Profile section without modifying shared FormInput */}
      <style>{`
        .profile-form-container input.form-control {
          background-color: #2A2A2B !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease;
        }
        .profile-form-container input.form-control:focus {
          border-color: #C5A059 !important;
          box-shadow: 0 0 0 0.25rem rgba(197, 160, 89, 0.25) !important;
        }
        .profile-form-container .form-label {
          color: rgba(255, 255, 255, 0.7);
        }
        .card-glass {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <Card className="mb-4 text-white">
        <div className="p-4 p-lg-5">
          <form onSubmit={handleSave}>
            <div className="row g-4">
              <div className="col-md-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  label="Billing Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 text-end mt-4 pt-4 border-top" style={{borderColor: 'rgba(255,255,255,0.1) !important'}}>
                <button type="submit" className="btn px-5 rounded-pill fw-bold transition shadow" style={{backgroundColor: '#C5A059', color: '#1A1A1B'}}>Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </Card>

      <h4 className="fw-bold mb-3 mt-5 text-white" style={{fontFamily: "'Playfair Display', serif"}}>Payment Methods</h4>
      <Card className="text-white">
        <div className="p-4 p-lg-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 rounded-4 position-relative overflow-hidden transition hover-scale text-white card-glass" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <i className="fab fa-cc-visa fa-2x" style={{color: '#C5A059'}}></i>
                  <span className="badge bg-transparent" style={{border: '1px solid #C5A059', color: '#C5A059'}}>Default</span>
                </div>
                <h5 className="fw-bold mb-2">•••• •••• •••• 4242</h5>
                <div className="d-flex justify-content-between small text-muted text-white">
                  <span style={{color: 'rgba(255,255,255,0.6)'}}>Expires 12/28</span>
                  <button className="btn btn-link p-0 text-danger text-decoration-none" style={{fontSize: '0.85rem'}}>Remove</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="h-100 p-4 rounded-4 d-flex flex-column justify-content-center align-items-center transition hover-scale text-muted card-glass" style={{border: '1px dashed rgba(255,255,255,0.2)', cursor: 'pointer'}}>
                <i className="fas fa-plus-circle fa-2x mb-2" style={{color: 'rgba(255,255,255,0.5)'}}></i>
                <span className="fw-bold" style={{color: 'rgba(255,255,255,0.7)'}}>Add New Method</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
