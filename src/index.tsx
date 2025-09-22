import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Clear any corrupted localStorage on refresh
try {
  const testKey = '__test__';
  localStorage.setItem(testKey, 'test');
  localStorage.removeItem(testKey);
} catch (e) {
  localStorage.clear();
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: Arial;"><h1>App Error</h1><p>Could not find root element</p></div>';
  } else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <App />
    );
  }
} catch (error) {
  console.error('Failed to render app:', error);
  localStorage.clear();
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: Arial;"><h1>App Error</h1><p>Failed to load application</p><button onclick="window.location.reload()">Reload</button></div>';
}