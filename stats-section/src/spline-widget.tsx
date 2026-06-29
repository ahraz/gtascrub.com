import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SplineScene } from './components/ui/splite'

const mountPoint = document.getElementById('spline-hero-widget')
if (mountPoint) {
  createRoot(mountPoint).render(
    <StrictMode>
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </StrictMode>
  )
}
