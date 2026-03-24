import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Card } from 'react-bootstrap';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderTable = ({ orders, title, onRowClick }) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
      <Card.Header className="bg-white p-4 border-bottom-0 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">{title}</h5>
      </Card.Header>
      <Table responsive hover className="m-0 align-middle table-borderless ds-table">
        <thead className="bg-light text-muted small text-uppercase fw-bold border-bottom">
          <tr>
            <th className="py-3 ps-4">Order ID</th>
            <th>Date &amp; Time</th>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Status</th>
            {onRowClick && <th className="text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-bottom">
                <td className="fw-bold ps-4 text-secondary">#{order.id}</td>
                <td>
                  <div className="fw-bold text-dark">{order.date}</div>
                  <small className="text-muted">{order.time}</small>
                </td>
                <td className="fw-bold text-dark">{order.client}</td>
                <td className="fw-bold text-dark">${order.amount.toLocaleString()}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                {onRowClick && (
                  <td className="text-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-pill px-3 fw-bold bg-white"
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
              <td colSpan={onRowClick ? 6 : 5} className="text-center p-5 text-muted">
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
