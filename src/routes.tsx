import { Navigate } from 'react-router-dom';
import Register from './pages/Register';
import AdminLoginForm from './pages/Admin/auth/AdminLogin';
import EditCustomerPage from './pages/Login/customers/EditCustomerPage';
import AdminEditCustomerPage from './pages/Admin/customers/EditCustomerPage';
import AddCustomerPage from './pages/Login/customers/AddCustomerPage';
import UserFormPage from './pages/Admin/users/UserFormPage';

const appRoutes = [
  { path: '/register', element: <Register /> },
  { path: '/login', element: <div /> }, // Placeholder, real Login injected in App.tsx
  { path: '/edit-customer/:id', element: <EditCustomerPage /> },
  { path: '/add-customer', element: <AddCustomerPage /> },
  { path: '/admin/login', element: <AdminLoginForm /> },
  { path: '/admin/add-user', element: <UserFormPage isEdit={false} /> },
  { path: '/admin/edit-user/:userId', element: <UserFormPage isEdit={true} /> },
  { path: '/admin/edit-customer/:id', element: <AdminEditCustomerPage /> },
  { path: '/', element: <Navigate to="/login" replace /> },
];

export default appRoutes;
