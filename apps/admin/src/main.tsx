import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { configureApiBaseUrl } from '@yumquick/api';

import { App } from './App';
import './index.css';

configureApiBaseUrl(import.meta.env.VITE_API_URL ?? 'http://localhost:3001');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
