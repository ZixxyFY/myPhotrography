import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BsModal, Button } from 'react-bootstrap';

const Modal = ({ show, onHide, title, secondaryAction, secondaryLabel, primaryAction, primaryLabel, primaryVariant = "primary", children, size = "md" }) => {
  return (
    <BsModal show={show} onHide={onHide} centered size={size} style={{ '--bs-modal-bg': '#242426' }}>
      <BsModal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
        <BsModal.Title className="fw-bold d-flex align-items-center gap-3" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>
          {title}
        </BsModal.Title>
      </BsModal.Header>
      
      <BsModal.Body className="p-4" style={{ fontFamily: "'Montserrat', sans-serif", color: '#F5F5F7' }}>
        {children}
        
        {(secondaryAction || primaryAction) && (
          <div className="d-flex gap-2 justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
            {secondaryAction && (
               <Button 
                 className="rounded-pill px-4" 
                 style={{ backgroundColor: 'transparent', border: '1px solid #A0A0A0', color: '#A0A0A0' }} 
                 onClick={secondaryAction}
               >
                 {secondaryLabel || "Cancel"}
               </Button>
            )}
            {primaryAction && (
               <Button 
                 className="rounded-pill px-4 border-0 fw-bold" 
                 style={{ backgroundColor: '#C5A059', color: '#1A1A1B' }} 
                 onClick={primaryAction}
               >
                 {primaryLabel || "Save"}
               </Button>
            )}
          </div>
        )}
      </BsModal.Body>
    </BsModal>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  secondaryAction: PropTypes.func,
  secondaryLabel: PropTypes.string,
  primaryAction: PropTypes.func,
  primaryLabel: PropTypes.string,
  primaryVariant: PropTypes.string,
  size: PropTypes.string
};

export default Modal;