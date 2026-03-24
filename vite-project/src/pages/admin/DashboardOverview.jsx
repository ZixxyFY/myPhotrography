import React, { useState } from 'react';
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import OrderTable from '../../components/OrderTable';

const CHART_DATA = {
  '1Y': [{n:'Jan',v:20000}, {n:'Feb',v:45000}, {n:'Mar',v:30000}, {n:'Apr',v:70000}, {n:'May',v:50000}, {n:'Jun',v:65000}],
  '6M': [{n:'Jan',v:15000}, {n:'Feb',v:25000}, {n:'Mar',v:40000}, {n:'Apr',v:35000}, {n:'May',v:55000}, {n:'Jun',v:45000}],
  '1M': [{n:'Week 1',v:5000}, {n:'Week 2',v:12000}, {n:'Week 3',v:8000}, {n:'Week 4',v:15000}]
};

const DashboardOverview = ({ orders, onRowClick }) => {
  const [chartRange, setChartRange] = useState('1Y');
  
  const todayDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="animate-fade-in" style={{fontFamily: 'sans-serif'}}>
      <div className="mb-4">
         <h3 className="fw-bold mb-1">Dashboard Overview</h3>
         <p className="text-muted">{todayDate}</p>
      </div>
      
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100 rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0">Revenue Report</h6>
                <ButtonGroup size="sm">
                   <Button variant={chartRange === '1M' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('1M')}>1M</Button>
                   <Button variant={chartRange === '6M' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('6M')}>6M</Button>
                   <Button variant={chartRange === '1Y' ? 'dark' : 'outline-dark'} onClick={() => setChartRange('1Y')}>1Y</Button>
                </ButtonGroup>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA[chartRange]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <div className="d-flex flex-column gap-3 h-100">
            <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4">
              <p className="text-muted small fw-bold text-uppercase mb-1">Total Earnings</p>
              <h2 className="fw-bold mb-2 text-dark" style={{fontFamily: 'sans-serif'}}>$238,485</h2>
              <small className="text-success fw-bold"><i className="fas fa-arrow-up me-1"></i>+14% vs last month</small>
            </Card>
            <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4">
              <p className="text-muted small fw-bold text-uppercase mb-1">Total Orders</p>
              <h2 className="fw-bold mb-2 text-dark" style={{fontFamily: 'sans-serif'}}>84,382</h2>
              <small className="text-success fw-bold"><i className="fas fa-arrow-up me-1"></i>+36% vs last year</small>
            </Card>
          </div>
        </Col>
      </Row>

      <OrderTable orders={orders} title="Recent Orders" onRowClick={onRowClick} />
    </div>
  );
};

export default DashboardOverview;
