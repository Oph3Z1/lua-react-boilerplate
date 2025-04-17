import { useState } from 'react'
import './index.css'
import { postNUI } from './hooks/postNUI'
import { GetNUIEvent } from './hooks/GetNUIEvent'

function App() {
  // State to control UI visibility
  const [Show, setShow] = useState(false)
  // State to hold selected language (Coming from lua)
  const [Language, setLanguage] = useState({})

  // Listen to "Show" event from the Lua side and update the state accordingly
  GetNUIEvent("Show", (data) => {
    setShow(true)
    setLanguage(data.Language) // Set the language based on the received data
  })

  // Function to close the UI and send a message to Lua side
  const CloseUI = () => {
    postNUI('CloseUI') // Send 'CloseUI' event to Lua side
    setShow(false) // Update state to hide the UI
  }

  if (!Show) return // Return nothing if Show is false, prevents UI from rendering
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className='w-[10vw] h-[10vw] flex items-center justify-center bg-[#19344e] rounded-[.2vw]'>
        <button className='w-[5vw] h-[2vw] rounded-[.2vw] bg-white cursor-pointer' onClick={CloseUI}>{ Language['close'] }</button>
      </div>
    </div>
  )
}

export default App