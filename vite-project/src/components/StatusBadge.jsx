import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
  let variant = 'secondary';
  if (status === 'Completed') variant = 'success';
  if (status === 'Confirmed') variant = 'info';
  if (status === 'New') variant = 'warning';
  if (status === 'Cancelled') variant = 'danger';

  return (
    <Badge
      bg={`${variant}-subtle`}
      text={variant === 'light' ? 'dark' : variant}
      className="px-3 py-2 rounded-pill fw-bold status-badge"
      data-status={status}
      style={{ fontFamily: 'var(--font-base)' }}
    >
      {status}
    </Badge>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;
