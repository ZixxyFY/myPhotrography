import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, type, name, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-3">
      <label className="form-label small fw-bold">{label}</label>
      <input 
        type={type} 
        name={name}
        className="form-control" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

// --- HERE IS THE VALIDATION ---
FormInput.propTypes = {
  // 1. Enforce that label is a string and is mandatory
  label: PropTypes.string.isRequired,
  
  // 2. Enforce that type is ONE OF these specific strings (prevents typos like 'txt')
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired,
  
  // 3. Name is required for the state handler (e.target.name) to work
  name: PropTypes.string.isRequired,
  
  // 4. Value must be a string (controlled component)
  value: PropTypes.string.isRequired,
  
  // 5. onChange must be a function
  onChange: PropTypes.func.isRequired,
  
  // 6. Optional props don't need .isRequired
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

// Default values for optional props
FormInput.defaultProps = {
  placeholder: '',
  required: false
};

export default FormInput;