import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ViewBoard from './ViewBoard.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/boards/:id/cards",
    element: <ViewBoard />
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
