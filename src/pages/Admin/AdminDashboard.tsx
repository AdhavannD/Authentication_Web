import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigationBar from './common/AdminNavigationBar';
import UsersTab from './tabs/UsersTab';
import CustomersTab from './tabs/CustomersTab';
import HistoryTab from './tabs/HistoryTab';
import AddAdminTab from './tabs/AddAdminTab';
import { Alert } from '@/components/ui/alert';
import { fetchAllUsers, softDeleteUser, fetchDeletedUsers } from '@/services/admin/userService';

// Removed unused: AddAdminForm, AdminCustomerTable, CustomerTableHistory
import { fetchCustomers, deleteCustomerAsAdmin, fetchDeletedCustomersForAdmin } from '@/services/admin/customerService';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  // Persist activeTab in localStorage
  const [activeTab, setActiveTabState] = useState<'users' | 'customers' | 'history' | 'addAdmin'>(() => {
    return (localStorage.getItem('admin_active_tab') as any) || 'users';
  });
  const setActiveTab = (tab: 'users' | 'customers' | 'history' | 'addAdmin') => {
    setActiveTabState(tab);
    localStorage.setItem('admin_active_tab', tab);
  };

  const [users, setUsers] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerUserIdSearch, setCustomerUserIdSearch] = useState('');
  const [error, setError] = useState('');
  const [, setAddSuccess] = useState(false);
  const [historyType, setHistoryType] = useState<'customer' | 'user'>('user');
  const [customerSortOrder, setCustomerSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      setError('No admin token found');
      return;
    }
    if (activeTab === 'users') {
      fetchAllUsers(token)
        .then(setUsers)
        .catch(() => setError('Failed to fetch users'));
    } else if (activeTab === 'history') {
      fetchAllUsers(token)
        .then(setUsers)
        .catch(() => setError('Failed to fetch users'));
      if (historyType === 'user') {
        fetchDeletedUsers(token)
          .then(setDeletedUsers)
          .catch(() => setError('Failed to fetch deleted users'));
      } else if (historyType === 'customer') {
        fetchDeletedCustomersForAdmin(token)
          .then(setDeletedUsers)
          .catch(() => setError('Failed to fetch deleted customers'));
      }
    } else if (activeTab === 'customers') {
      fetchCustomers(token)
        .then(setCustomers)
        .catch(() => setError('Failed to fetch customers'));
    }
  }, [activeTab, historyType]);

  const filteredUsers = users.filter((u: any) =>
    !u.deleted_at && (
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    )
  );

  const filteredCustomers = customers.filter((c: any) =>
    (c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())) &&
    (customerUserIdSearch === '' || String(c.user_id ?? c.customer_id).includes(customerUserIdSearch))
  );

  // Delete customer as admin
  const handleDeleteCustomer = async (customerId: number) => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) return toast.error('No admin token found');
    try {
      await deleteCustomerAsAdmin(token, customerId);
      setCustomers(prev => prev.filter(c => c.customer_id !== customerId));
      toast.success('Customer deleted successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Error deleting customer');
    }
  };

  // Soft delete user as admin
  const handleDeleteUser = async (userId: number) => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) return toast.error('No admin token found');
    try {
      await softDeleteUser(token, userId);
      // Refetch users to get updated deleted_at
      const updatedUsers = await fetchAllUsers(token);
      setUsers(updatedUsers);
      toast.success('User deleted successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Error deleting user');
    }
  };

  // Debug log for users and deleted users
  if (typeof window !== 'undefined') {
    console.log('All users:', users);
    console.log('Deleted users:', users.filter((u: any) => u.deleted_at));
  }

  // Get admin info from localStorage
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  return (
    <div className="logged-in-wrapper">
      <div style={{ textAlign: 'center', color: '#1976d2', fontSize: '3rem', fontWeight: 800, margin: '2.5rem 0 2rem 0' }}>
        {admin?.name ? `` : ''}
      </div>
      <AdminNavigationBar activeTab={activeTab} onTabChange={tab => { setActiveTab(tab); setAddSuccess(false); }} />
      <div style={{ margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'centre', margin: '0 0 0.5rem 0', width: '100%' }}>
          <h3 style={{ color: '#1976d2', margin: 0, textAlign: 'center', paddingLeft: '0px', fontSize: '2rem' }}>
            {activeTab === 'users' ? 'All Users' : activeTab === 'customers' ? 'All Customers' : activeTab === 'history' ? 'User/Customer History' : 'Add a new Admin'}
          </h3>
        </div>
        {error && <Alert variant="destructive" className="mt-4">{error}</Alert>}
        {activeTab === 'users' && !error && (
          <UsersTab
            users={filteredUsers}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            onDelete={handleDeleteUser}
            onEdit={(user) => navigate(`/admin/edit-user/${user.id}`)}
          />
        )}
        {activeTab === 'customers' && !error && (
          <CustomersTab
            customers={filteredCustomers}
            customerSearch={customerSearch}
            setCustomerSearch={setCustomerSearch}
            customerUserIdSearch={customerUserIdSearch}
            setCustomerUserIdSearch={setCustomerUserIdSearch}
            customerSortOrder={customerSortOrder}
            setCustomerSortOrder={setCustomerSortOrder}
            onDelete={handleDeleteCustomer}
          />
        )}
        {activeTab === 'history' && !error && (
          <HistoryTab
            historyType={historyType}
            setHistoryType={setHistoryType}
            deletedUsers={deletedUsers}
          />
        )}
        {activeTab === 'addAdmin' && (
          <AddAdminTab setAddSuccess={setAddSuccess} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
