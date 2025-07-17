import { useState } from 'react'
import './App.css'
import NavBar from './components/layout/navBar'
import FramerMotionWebsite from './pages/home/FramerMotionWebsite'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='conteiner'>
      <FramerMotionWebsite/>
    </div>
  )
}

export default App
