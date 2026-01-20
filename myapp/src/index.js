import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // This imports the main website component
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded globally

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();