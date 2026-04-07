import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Card } from 'react-bootstrap';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderTable = ({ orders, title, onRowClick }) => {
  return (
    <Card 
      className="border-0 shadow-sm rounded-4 overflow-hidden" 
      style={{ backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)' }}
    >
      {/* FIX: Removed bg-white */}
      <Card.Header className="p-4 border-bottom-0 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
        <h5 className="mb-0 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F5F7' }}>{title}</h5>
      </Card.Header>
      
      {/* FIX: Overriding Bootstrap's default table colors */}
      <Table responsive hover className="m-0 align-middle table-borderless" style={{ '--bs-table-bg': 'transparent', '--bs-table-color': '#F5F5F7' }}>
        {/* FIX: Removed bg-light */}
        <thead className="small text-uppercase fw-bold" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.3)' }}>
          <tr style={{ backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
            <th className="py-3 ps-4" style={{ color: '#A0A0A0' }}>Order ID</th>
            <th style={{ color: '#A0A0A0' }}>Date &amp; Time</th>
            <th style={{ color: '#A0A0A0' }}>Client Name</th>
            <th style={{ color: '#A0A0A0' }}>Amount</th>
            <th style={{ color: '#A0A0A0' }}>Status</th>
            {onRowClick && <th className="text-center" style={{ color: '#A0A0A0' }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.1)' }}>
                <td className="fw-bold ps-4" style={{ color: '#C5A059' }}>#{order.id}</td>
                <td>
                  <div className="fw-bold" style={{ color: '#F5F5F7' }}>{order.date}</div>
                  <small style={{ color: '#A0A0A0' }}>{order.time || '10:00 AM'}</small>
                </td>
                <td className="fw-bold" style={{ color: '#F5F5F7' }}>{order.client}</td>
                <td className="fw-bold" style={{ color: '#F5F5F7' }}>${order.amount ? order.amount.toLocaleString() : '0'}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                {onRowClick && (
                  <td className="text-center">
                    <Button
                      size="sm"
                      className="rounded-pill px-3 fw-bold d-inline-flex align-items-center justify-content-center"
                      style={{ 
                        backgroundColor: 'transparent', 
                        border: '1px solid rgba(197, 160, 89, 0.5)', 
                        color: '#C5A059'
                      }}
                      onClick={() => onRowClick(order)}
                    >
                      <Eye size={14} className="me-1" /> View
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={onRowClick ? 6 : 5} className="text-center p-5" style={{ color: '#A0A0A0' }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  title: PropTypes.string,
  onRowClick: PropTypes.func
};

OrderTable.defaultProps = {
  title: 'Orders'
};

export default OrderTable;