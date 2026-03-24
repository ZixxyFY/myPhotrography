import React, { useState } from 'react';
import Card from '../../components/Card';
import FormInput from '../../components/FormInput';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user || 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    address: '123 Photography Lane, New York'
  });

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value});
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully");
  };

  return (
    <div className="fade-in max-w-2xl mx-auto" style={{maxWidth: '800px'}}>
      <h3 className="fw-bold mb-4">My Profile</h3>
      <Card>
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
              <div className="col-12 text-end mt-4 pt-3 border-top">
                <button type="submit" className="btn btn-ds-primary px-5 rounded-pill fw-bold">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
