import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import ParticipantsListPage from './pages/participants-list-page/ParticipantsListPage';
import PageTemplate from './layouts/page-template/PageTemplate';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
      {
        path: '/participants',
        element: <ParticipantsListPage />,
      },
    ],
  },
]);
