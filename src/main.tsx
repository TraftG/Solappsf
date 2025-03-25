import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';
import { ThemeProvider } from './providers/theme-provider';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <ThemeProvider defaultTheme="system" storageKey="solapps-theme">
    <App />
  </ThemeProvider>
);
