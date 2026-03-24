import React from 'react';
import OrderTable from '../../components/OrderTable';
import { MOCK_ORDERS } from '../../data/mockOrders';

const MyBookings = () => {
  // Simulate filtering the global mock orders to just this user's bookings (using the first 3 for mock)
  const myBookings = MOCK_ORDERS.slice(0, 3);

  return (
    <div className="fade-in">
      <h3 className="fw-bold mb-4">My Bookings</h3>
      <OrderTable 
        orders={myBookings} 
        title="Recent Services" 
      />
    </div>
  );
};

export default MyBookings;
