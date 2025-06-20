import { createRoot } from 'react-dom/client'
import './index.css'
import App from './HomePage/App.jsx'
import ViewBoard from './ViewBoard/ViewBoard.jsx'
import {DarkModeProvider} from './DarkModeContext.jsx'
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
    <DarkModeProvider>
      <RouterProvider router={routes} />
    </DarkModeProvider>
)
