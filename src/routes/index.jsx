import { Routes as RouterRoutes, Route } from 'react-router-dom'
import About from '../components/About'

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<About />} />
    </RouterRoutes>
  )
} 