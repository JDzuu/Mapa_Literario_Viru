import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// El orden importa: variables primero, luego cada módulo
import './styles/globales.css';
import './styles/mapa.css';
import './styles/zona.css';
import './styles/menu.css';
import './styles/inicio.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
