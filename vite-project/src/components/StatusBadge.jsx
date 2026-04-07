import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
  let badgeStyle = { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#A0A0A0', border: '1px solid rgba(255, 255, 255, 0.2)' };
  
  if (status === 'Completed') badgeStyle = { backgroundColor: 'rgba(197, 160, 89, 0.2)', color: '#C5A059', border: '1px solid rgba(197, 160, 89, 0.5)' };
  if (status === 'Confirmed') badgeStyle = { backgroundColor: 'rgba(197, 160, 89, 0.5)', color: '#1A1A1B', border: '1px solid #C5A059' };
  if (status === 'New') badgeStyle = { backgroundColor: '#C5A059', color: '#1A1A1B' };
  if (status === 'Cancelled') badgeStyle = { backgroundColor: 'rgba(220, 53, 69, 0.2)', color: '#F5F5F7', border: '1px solid rgba(220, 53, 69, 0.5)' };

  return (
    <Badge
      className="px-3 py-2 rounded-pill fw-bold status-badge"
      data-status={status}
      style={{ ...badgeStyle, fontFamily: "'Montserrat', sans-serif" }}
    >
      {status}
    </Badge>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;