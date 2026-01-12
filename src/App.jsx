import React from 'react'
import { PomodoroProvider } from './context/PomodoroContext'
import Container from './components/Layout/Container'
import Header from './components/Layout/Header'
import Timer from './components/Timer/Timer'
import TimerControls from './components/Timer/TimerControls'
import TimerSettings from './components/Timer/TimerSettings'
import TaskInput from './components/Task/TaskInput'
import Stats from './components/Statistics/Stats'

function App() {
  return (
    <PomodoroProvider>
      <Container>
        <Header />
        <main className="flex flex-col items-center justify-center gap-8 px-4 py-8">
          <Timer />
          <TimerControls />
          <TaskInput />
        </main>
        <Stats />
        <TimerSettings />
      </Container>
    </PomodoroProvider>
  )
}

export default App
