import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router.jsx'
import UserStateContext from './Contexts/user-state-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStateContext>
      <Router />
    </UserStateContext>
  </React.StrictMode>,
)
