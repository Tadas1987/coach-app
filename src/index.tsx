import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CoachList } from './pages/CoachList';
import { CoachesProvider } from './pages/CoachContext';
import { CreatePage } from './pages/CreatePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreatePage />,
  },
  {
    path: '/coach-list',
    element: <CoachList />,
  },
]);

root.render(
  <React.StrictMode>
    <CoachesProvider>
      <RouterProvider router={router} />
    </CoachesProvider>
  </React.StrictMode>
);
