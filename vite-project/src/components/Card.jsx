import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', isDashboardCard = false, hoverScale = false, ...props }) => {
  const baseClasses = `card border-0 shadow-sm ${isDashboardCard ? 'dashboard-card' : 'card-modern'} ${hoverScale ? 'hover-scale' : ''}`;
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDashboardCard: PropTypes.bool,
  hoverScale: PropTypes.bool
};

export default Card;
