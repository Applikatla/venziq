import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import App from './App.tsx'
import { ThemeProvider } from './lib/theme'
import { TrustProvider } from './lib/trust'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TrustProvider>
        <App />
      </TrustProvider>
    </ThemeProvider>
  </StrictMode>,
)
