import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const params = new URLSearchParams(window.location.search);
const p = params.get('p');
const q = params.get('q');
const h = params.get('h');
if (p !== null) {
  const search = q ? `?${q}` : '';
  const hash = h ? `#${h}` : '';
  const base = import.meta.env.BASE_URL || '/';
  window.history.replaceState(null, '', `${base}${p}${search}${hash}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
