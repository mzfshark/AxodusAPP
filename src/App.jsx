import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { BotProvider } from '@context/BotContext';
import { RealtimeProvider } from '@context/RealtimeContext';
import NotificationCenter from '@components/notifications/NotificationCenter';
import './styles/Global.module.css';

function App() {
  return (
    <RealtimeProvider>
      <BotProvider>
        <RouterProvider router={router} />
        <NotificationCenter />
      </BotProvider>
    </RealtimeProvider>
  );
}

export default App;
