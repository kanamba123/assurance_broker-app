import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastNotification from './components/ui/ToastNotification.jsx';
import App from './App.jsx';
const queryClient = new QueryClient();
import './i18n';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastNotification />
      <App />
    </QueryClientProvider>
  </StrictMode>
);