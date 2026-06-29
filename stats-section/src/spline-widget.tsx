import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CleaningScene } from './components/CleaningScene'

const mountPoint = document.getElementById('spline-hero-widget')
if (mountPoint) {
  createRoot(mountPoint).render(
    <StrictMode>
      <CleaningScene />
    </StrictMode>
  )
}
