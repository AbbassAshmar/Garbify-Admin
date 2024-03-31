import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './router.jsx';
import UserStateContext from './Contexts/user-state-context.jsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStateContext>
      <RouterProvider router={Router}/>
    </UserStateContext>
  </React.StrictMode>,
)
