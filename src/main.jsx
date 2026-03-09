import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import JAMBGovApp from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JAMBGovApp />
  </StrictMode>,
)
