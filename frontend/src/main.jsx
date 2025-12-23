import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Router } from './routes/Router.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
    {/* <App /> */}
  </StrictMode>,
)
