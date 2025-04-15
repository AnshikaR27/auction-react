import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // <--- THIS must be your App.js file

const root = ReactDOM.createRoot(document.getElementById('demo'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
