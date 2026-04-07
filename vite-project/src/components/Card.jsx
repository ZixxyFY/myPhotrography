import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', isDashboardCard = false, hoverScale = false, ...props }) => {
  // FIX: Removed the generic 'card' class to stop Bootstrap interference
  const baseClasses = `border-0 shadow-sm ${isDashboardCard ? 'dashboard-card' : ''} ${hoverScale ? 'hover-scale' : ''}`;
  
  return (
    <div 
      className={`${baseClasses} ${className}`} 
      style={{ 
        backgroundColor: '#242426', 
        color: '#F5F5F7', 
        border: '1px solid rgba(197, 160, 89, 0.3)',
        borderRadius: '12px',
        ...props.style 
      }} 
      {...props}
    >
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