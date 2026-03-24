import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BsModal, Button } from 'react-bootstrap';

const Modal = ({ show, onHide, title, secondaryAction, secondaryLabel, primaryAction, primaryLabel, primaryVariant = "primary", children, size = "md" }) => {
  return (
    <BsModal show={show} onHide={onHide} centered size={size}>
      <BsModal.Header closeButton className="border-bottom bg-light">
        <BsModal.Title className="fw-bold d-flex align-items-center gap-3">
          {title}
        </BsModal.Title>
      </BsModal.Header>
      <BsModal.Body className="p-4" style={{ fontFamily: 'var(--font-base)' }}>
        {children}
        
        {(secondaryAction || primaryAction) && (
          <div className="d-flex gap-2 justify-content-end mt-4">
            {secondaryAction && (
               <Button variant="light" className="rounded-pill px-4" onClick={secondaryAction}>{secondaryLabel || "Cancel"}</Button>
            )}
            {primaryAction && (
               <Button variant={primaryVariant} className="rounded-pill px-4" onClick={primaryAction}>{primaryLabel || "Save"}</Button>
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
