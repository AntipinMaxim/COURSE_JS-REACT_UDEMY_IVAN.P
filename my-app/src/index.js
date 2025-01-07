import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const elem = (
  <div>
    <h2>Hello World!</h2>
    
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  elem
);
