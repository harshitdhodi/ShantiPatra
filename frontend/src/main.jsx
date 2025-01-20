import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ColorProvider } from './AdminComponents/ColorContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

createRoot(document.getElementById('root')).render(
  <ColorProvider>
    <StrictMode>
    <App />
  </StrictMode>
  </ColorProvider>

)
 