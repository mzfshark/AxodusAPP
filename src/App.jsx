import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { BotProvider } from '@context/BotContext';
import './styles/Global.module.css';

function App() {
  return (
    <BotProvider>
      <RouterProvider router={router} />
    </BotProvider>
  );
}

export default App;
