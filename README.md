# Lua-React Boilerplate for FiveM
This repository contains a basic boilerplate for getting started with React in NUI. It contains several helpful utilities and is bootstrapped using *vite*. 

This version of Boilerplate is for integrating a React UI with Lua in FiveM using NUI.

## Requirements
* [Node](https://nodejs.org/en/)

or
* [Yarn](https://yarnpkg.com/getting-started/install)

*A basic understanding of the modern web development workflow. If you don't know this yet, React might not be for you yet.*

## Features
- The project is styled using both regular CSS and TailwindCSS.
- PostNUI and GetNUIEvent Hooks:
   - `postNUI`: sends data to the Lua side, triggering events in the FiveM script.
   - `GetNUIEvent`: listens for events sent from Lua and updates the UI accordingly.

## Getting Started
First clone the repository or use the template option and place it within your ``resources`` folder

### Installation
Navigate to the ``web`` folder inside the project directory and run:
   ```bash
   npm install
  ```
or
```bash
yarn install
```
*The boilerplate was made using npm but is still compatible with yarn.*

## Usage

### GetNUIEvent:
client/main.lua:
```lua
-- Register an in-game command called "ui"
RegisterCommand('ui', function()
    
    -- Send a message to the React UI with action type "Show"
    -- This will trigger any React listeners (like GetNUIEvent("Show", ...))
    -- 'Language' is passed to the UI for localization (e.g., button text)
    SendNUIMessage({
        action = 'Show',
        Language = Locales[Config.Language] -- Send localized text from Lua to React
    })

    -- Give control to the NUI (React) interface so user can interact with it
    SetNuiFocus(true, true)
end)
```

App.jsx:
```jsx
function App() {
  // State to control UI visibility
  const [Show, setShow] = useState(false)
  // State to hold selected language (Coming from lua)
  const [Language, setLanguage] = useState({})

  // Listen for an NUI message from the Lua side with the action "Show"
  // When such a message is received, trigger the callback function below
  GetNUIEvent("Show", (data) => {
    setShow(true) // Display the UI by updating the state
    setLanguage(data.Language) // Set the language based on the received data
  })

  if (!Show) return // Return nothing if Show is false, prevents UI from rendering
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className='w-[10vw] h-[10vw] flex items-center justify-center bg-[#19344e] rounded-[.2vw]'>
        <button className='w-[5vw] h-[2vw] rounded-[.2vw] bg-white cursor-pointer'>{ Language['close'] }</button>
      </div>
    </div>
  )
}
```

### postNUI:
App.jsx:
```jsx
function App() {
  // State to control UI visibility
  const [Show, setShow] = useState(false)

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
```

client/main.lua:
```lua
-- Register a callback function for the "CloseUI" event sent from the React side
RegisterNUICallback('CloseUI', function(data, cb)
    
    -- Remove focus from the NUI (React UI), giving control back to the game
    SetNuiFocus(false, false)
    
    -- Print a debug message to confirm the close event was received
    print('Got close event!')

    -- Always call the callback to let the React side know the event was handled
    cb({})
end)
```

## Development Workflow
### Start the Dev Server (Live Preview)
Run the project locally in development mode. This launches a live server that automatically reloads the page on file changes.

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

### Build for Production
Compile the project for production. This will output static files (`index.html`, `assets/*.js`, `assets/*.css`) to the `build` folder. These files are what you need to load the UI inside your FiveM resource.

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

### Auto-Build on Save (Watch Mode)
Automatically rebuild the UI every time you save a file. This is useful when actively developing and testing in-game so you don't need to run `build` manually every time.

Using npm:
```bash
npm run watch
# This is an alias for: npm run build --watch
```

Using yarn:
```bash
yarn watch
# This is an alias for: yarn build --watch
```

