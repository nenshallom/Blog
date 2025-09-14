import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { initializeTheme } from './utils/theme';
import './index.css'
import App from './App.tsx'


initializeTheme();  
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HelmetProvider>
)
