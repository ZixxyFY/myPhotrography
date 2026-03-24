import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, type, name, value, onChange, placeholder, required, pattern, errorMsg }) => {
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
        pattern={pattern} // <--- ADDS REGEX SUPPORT
        title={errorMsg}  // <--- Shows this message if regex fails
      />
      {/* Optional: Visual hint text */}
      {errorMsg && <div className="form-text text-muted" style={{fontSize: '0.7rem'}}>{errorMsg}</div>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.string, // New Prop
  errorMsg: PropTypes.string // New Prop
};

FormInput.defaultProps = {
  placeholder: '',
  required: false,
  pattern: undefined,
  errorMsg: ''
};

export default FormInput;