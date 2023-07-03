import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { setupStore } from './app/store';
import App from './App';

const store = setupStore({});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </HashRouter>
  </Provider>
);

reportWebVitals();
