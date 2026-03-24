import React from 'react';
import OrderTable from '../../components/OrderTable';

const OrdersView = ({ orders, filter, onRowClick }) => {
  const todayDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="animate-fade-in" style={{fontFamily: 'sans-serif'}}>
      <div className="mb-4">
         <h3 className="fw-bold mb-1">{filter === 'All' ? 'All Orders' : `${filter} Orders`}</h3>
         <p className="text-muted">{todayDate}</p>
      </div>

      <OrderTable 
        orders={orders} 
        title={`${filter} Orders`} 
        onRowClick={onRowClick} 
      />
    </div>
  );
};

export default OrdersView;
