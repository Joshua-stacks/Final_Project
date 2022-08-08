import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoggedUserProvider } from './LoggedUserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggedUserProvider>
    <App />
    </LoggedUserProvider>
  </React.StrictMode>
);


