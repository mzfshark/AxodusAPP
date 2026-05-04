import React from 'react';
import ReactDOM from 'react-dom/client';

import routes from './routes'; 
import { InvestmentProvider } from './context/InvestmentContext';
import { AppKitProvider } from './providers/AppKitProvider';
import { RouterProvider } from 'react-router-dom'; 
import { RealtimeProvider } from './context/RealtimeContext';
import { BotProvider } from './context/BotContext';
import NotificationCenter from './components/notifications/NotificationCenter';
import ErrorBoundary from './ErrorBoundary';
import './styles/Global.css';

// Diagnóstico global para produção
window.addEventListener('error', (event) => {
  console.error('[Global Error]', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Rejection]', event.reason);
});

window.addEventListener('error', (event) => {
  const target = event.target;
  if (target instanceof HTMLImageElement && !target.dataset.fallbackApplied) {
    target.dataset.fallbackApplied = "true";
    target.src = "/logo.svg";
    target.classList.add("image-fallback");
  }
}, true);

const persisted = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = persisted === "light" || persisted === "dark"
  ? persisted
  : prefersDark
    ? "dark"
    : "light";
document.documentElement.dataset.theme = initialTheme;
document.documentElement.classList.toggle("dark", initialTheme === "dark");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: 'root' element not found in DOM");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppKitProvider>
          <RealtimeProvider>
            <BotProvider>
              <InvestmentProvider>
                <RouterProvider router={routes} /> 
                <NotificationCenter />
              </InvestmentProvider>
            </BotProvider>
          </RealtimeProvider>
        </AppKitProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
