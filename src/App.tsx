import { DashboardProvider } from './context/DashboardContext'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  )
}

export default App
