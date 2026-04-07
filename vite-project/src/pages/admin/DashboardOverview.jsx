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
    <div className="animate-fade-in" style={{fontFamily: "'Montserrat', sans-serif"}}>
      <div className="mb-4">
         <h3 className="fw-bold mb-1" style={{fontFamily: "'Playfair Display', serif", color: '#F5F5F7'}}>Dashboard Overview</h3>
         <p style={{color: '#A0A0A0'}}>{todayDate}</p>
      </div>
      
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100 rounded-4" style={{backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0" style={{color: '#F5F5F7'}}>Revenue Report</h6>
                <ButtonGroup size="sm">
                   <Button 
                     style={{
                        backgroundColor: chartRange === '1M' ? '#C5A059' : 'transparent',
                        borderColor: '#C5A059',
                        color: chartRange === '1M' ? '#1A1A1B' : '#C5A059'
                     }} 
                     onClick={() => setChartRange('1M')}
                   >1M</Button>
                   <Button 
                     style={{
                        backgroundColor: chartRange === '6M' ? '#C5A059' : 'transparent',
                        borderColor: '#C5A059',
                        color: chartRange === '6M' ? '#1A1A1B' : '#C5A059'
                     }} 
                     onClick={() => setChartRange('6M')}
                   >6M</Button>
                   <Button 
                     style={{
                        backgroundColor: chartRange === '1Y' ? '#C5A059' : 'transparent',
                        borderColor: '#C5A059',
                        color: chartRange === '1Y' ? '#1A1A1B' : '#C5A059'
                     }} 
                     onClick={() => setChartRange('1Y')}
                   >1Y</Button>
                </ButtonGroup>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA[chartRange]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C5A059" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#C5A059" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(197, 160, 89, 0.1)" />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#A0A0A0'}} />
                    <Tooltip contentStyle={{backgroundColor: '#242426', borderRadius: '8px', border: '1px solid rgba(197, 160, 89, 0.3)', color: '#F5F5F7'}} itemStyle={{color: '#C5A059'}} />
                    <Area type="monotone" dataKey="v" stroke="#C5A059" strokeWidth={3} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <div className="d-flex flex-column gap-3 h-100">
            <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4" style={{backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
              <p className="small fw-bold text-uppercase mb-1" style={{color: '#A0A0A0'}}>Total Earnings</p>
              <h2 className="fw-bold mb-2" style={{fontFamily: "'Playfair Display', serif", color: '#C5A059'}}>$238,485</h2>
              <small className="fw-bold" style={{color: '#198754'}}><i className="fas fa-arrow-up me-1"></i>+14% vs last month</small>
            </Card>
            <Card className="border-0 shadow-sm rounded-4 flex-grow-1 p-4" style={{backgroundColor: '#242426', border: '1px solid rgba(197, 160, 89, 0.3)'}}>
              <p className="small fw-bold text-uppercase mb-1" style={{color: '#A0A0A0'}}>Total Orders</p>
              <h2 className="fw-bold mb-2" style={{fontFamily: "'Playfair Display', serif", color: '#C5A059'}}>84,382</h2>
              <small className="fw-bold" style={{color: '#198754'}}><i className="fas fa-arrow-up me-1"></i>+36% vs last year</small>
            </Card>
          </div>
        </Col>
      </Row>

      {/* NOTE: OrderTable also needs to be updated to fix the white background */}
      <OrderTable orders={orders} title="Recent Orders" onRowClick={onRowClick} />
    </div>
  );
};

export default DashboardOverview;