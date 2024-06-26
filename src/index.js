import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import TemplateProcess from './pages/TemplateProcess';
import BlueprintTemplate from './pages/BlueprintTemplate';

import './index.css';
// import './static/css/diagramWithEditor.css';
// import './static/js/diagramWithEditor.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BlueprintTemplate />
  <TemplateProcess />
  // <App />
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
