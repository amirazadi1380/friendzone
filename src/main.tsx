import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
  <QueryClientProvider client={client}>
        <App />
  </QueryClientProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
