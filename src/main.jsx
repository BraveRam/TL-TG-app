import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { TgProvider } from "./Contexts/TgContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
     <BrowserRouter>
      <TgProvider>
        <App />
      </TgProvider>
     </BrowserRouter>
    </ErrorBoundary>

  </StrictMode>,
)
