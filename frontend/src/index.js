// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 
import global_en from "./translations/English/global"; 
import global_sin from "./translations/Sinhala/global"; 
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    si: {
      global: global_sin,
    },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(); 
