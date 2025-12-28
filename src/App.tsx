import { Routes, Route, Navigate } from 'react-router-dom'
import { CalendarPage } from './components/CalendarPage'
import { DateConverterPage } from './components/DateConverterPage'
import { LearnPage } from './components/LearnPage'
import { NumberConverterPage } from './pages/NumberConverterPage'
import { SupportPage } from './pages/SupportPage'
import { ReportIssuePage } from './pages/ReportIssuePage'

function App() {
    return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/dates" element={<DateConverterPage />} />
      <Route path="/numbers" element={<NumberConverterPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/report" element={<ReportIssuePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
