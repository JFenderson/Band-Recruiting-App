import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as React from 'react';
import { ThemeProvider } from "@material-tailwind/react";


createRoot(document.getElementById('root')! as HTMLElement).render(
<React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
