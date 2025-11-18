import React from 'react';
import ReactDOM from 'react-dom/client';

import routes from './routes'; // ✅ é o createBrowserRouter
import { InvestmentProvider } from './context/InvestmentContext';
import { AppKitProvider } from './providers/AppKitProvider';
import { RouterProvider } from 'react-router-dom'; // ✅ necessário!
import { RealtimeProvider } from '@context/RealtimeContext';
import { BotProvider } from '@context/BotContext';
import NotificationCenter from '@components/notifications/NotificationCenter';

const persisted = localStorage.getItem("theme");
if (persisted === "dark") document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppKitProvider>
      <RealtimeProvider>
        <BotProvider>
          <InvestmentProvider>
            <RouterProvider router={routes} /> {/* ✅ CORRETO */}
            <NotificationCenter />
          </InvestmentProvider>
        </BotProvider>
      </RealtimeProvider>
    </AppKitProvider>
  </React.StrictMode>
);
