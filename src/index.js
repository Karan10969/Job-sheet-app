import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import NewJob from './components/NewJob'
import Edit from './components/Edit'
import View from './components/View'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './components/Home';

import store from './app/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'new',
        element: <NewJob />
      },
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: ':id',
        element: <View />
      }
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>

  </React.StrictMode>
);

