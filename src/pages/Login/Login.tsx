import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/loginSchema';
import type { LoginFormInputs } from '../../schemas/loginSchema';
import LoginForm from './auth/LoginForm';
import CustomerTable from './customers/CustomerTable';
import CustomerSearchBar from './customers/CustomerSearchBar';
import { loginUser } from "../../services/user/authService";
import {
  fetchCustomersForUser,
  deleteCustomer,
  fetchDeletedCustomers,
} from "../../services/customer/customerService";
import { Button } from '../../components/ui/button';
import NavigationBar from './common/NavigationBar';
import CustomerTableHistory from './customers/CustomerTableHistory';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Update Customer type for history
interface Customer {
  customer_id: number;
  name: string;
  email: string;
  token?: string;
  deleted_at?: string;
}

const Login = ({ user, setUser }: { user: { name: string; email: string; access_token: string } | null, setUser: (user: { name: string; email: string; access_token: string } | null) => void }) => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const [historyCustomers, setHistoryCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, reset: resetLogin, trigger: triggerLogin } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const fetchCustomersHandler = async () => {
    if (!user) return;
    try {
      const data = await fetchCustomersForUser(user.access_token);
      setCustomers(data);
      // toast.success('Customers loaded successfully!'); // Optional
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Could not fetch customers');
    }
  };

  const onLogin = async (data: LoginFormInputs) => {
    try {
      const res = await loginUser(data);
      const userObj = { name: res.name, email: res.email, access_token: res.access_token };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('access_token', userObj.access_token);
      toast.success('Login successful!');
      fetchCustomersHandler();
      resetLogin();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed');
    }
  };

  const handleDeleteCustomer = async (customer_id: number) => {
    if (!user) return;
    try {
      await deleteCustomer(user.access_token, customer_id);
      toast.success('Customer deleted successfully!');
      fetchCustomersHandler();
      fetchHistoryCustomers(); // Ensure deleted customers are refreshed
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Error deleting customer');
    }
  };

  // Fetch deleted customers for history tab
  const fetchHistoryCustomers = async () => {
    if (!user) return;
    try {
      
      const data = await fetchDeletedCustomers(user.access_token);
      setHistoryCustomers(data);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Could not fetch history');
    }
  };

  useEffect(() => {
    if (user) {
      fetchCustomersHandler();
    } else {
      setCustomers(null);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistoryCustomers();
    }
    // eslint-disable-next-line
  }, [activeTab, user]);

  // Filter customers by name or email, and exclude soft-deleted
  const filteredCustomers = (customers ?? [])
    .filter((c) => !c.deleted_at)
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      {!user && <h2 style={{ textAlign: 'center', width: '100%' }}>User Login</h2>}
      {user ? (
        <>
          <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
          <div style={{ margin: '0 auto', width: '100%' }}>
            <div style={{ textAlign: 'center', color: '#1976d2', fontSize: '3rem', fontWeight: 800, margin: '2.5rem 0 2rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 0.5rem 0', width: '100%' }}>
              <h3 style={{ color: '#1976d2', margin: 0, textAlign: 'center', paddingLeft: '0px',fontSize: '2rem' }}>
                {activeTab === 'home' ? 'My Customers' : 'Customer History'}
              </h3>
            </div>
            {activeTab === 'home' ? (
              <>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16, gap: '1.2rem', flexWrap: 'wrap' }}>
                  <CustomerSearchBar value={search} onChange={setSearch} />
                  <Button
                    style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.98rem', fontWeight: 600, cursor: 'pointer', minWidth: 120, marginTop: 8, marginBottom: 8 }}
                    onClick={() => navigate('/add-customer')}
                  >
                    + Add Customer
                  </Button>
                </div>
                <CustomerTable customers={filteredCustomers} onDelete={handleDeleteCustomer} />
              </>
            ) : (
              <CustomerTableHistory customers={historyCustomers} />
            )}
          </div>
        </>
      ) : (
        <>
          <LoginForm onLogin={onLogin} errors={loginErrors} trigger={triggerLogin} register={loginRegister} handleSubmit={handleLoginSubmit} />
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
            New user?{' '}
            <a href="/register" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
              Register now
            </a>
          </div>
          <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
            Are you admin?{' '}
            <a href="/admin/login" style={{ color: '#d32f2f', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
              Login here
            </a>
          </div>
        </>
      )}
    </>
  );
};
export default Login;