import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import RoadmapV1 from './pages/RoadmapV1.tsx'
import RoadmapV2 from './pages/RoadmapV2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roadmap" element={<RoadmapV1 />} />
        <Route path="/roadmap2" element={<RoadmapV2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
