// Test simple React mount
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('🔍 Testing React mount...');

const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is mounting correctly.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<TestApp />);

console.log('✅ React mounted successfully');
