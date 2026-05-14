// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Meme from './Meme.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Meme />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import Meme from './Meme.jsx' // Ou le nom de TON fichier
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Meme /> 
  </React.StrictMode>,
)