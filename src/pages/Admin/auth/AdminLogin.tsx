import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { adminLogin } from "@/services/admin/authService";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AdminDashboard from '../AdminDashboard';

const AdminLogin = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { handleSubmit, formState: { isValid }, trigger, control } = form;

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('admin_access_token');
    if (storedAdmin && token) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      setAdmin(null);
    }
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await adminLogin(data.email, data.password);
      // Ensure admin object has name, email, and access_token just like user
      const adminObj = {
        name: res.name || res.admin?.name || data.email,
        email: res.email || res.admin?.email || data.email,
        access_token: res.access_token
      };
      localStorage.setItem('admin', JSON.stringify(adminObj));
      localStorage.setItem('admin_access_token', adminObj.access_token);
      setAdmin(adminObj);
      toast.success('Admin login successful!');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_active_tab');
    toast.success('Logged out successfully!');
  }, []);

  if (!admin) {
    return (
      <>
        <h2 style={{ textAlign: 'center', width: '100%' }}>Admin Login</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }} noValidate>
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input {...field} placeholder="Email" type="email" autoFocus className="bg-white text-black border border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <input
                        {...field}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        minLength={6}
                        className="bg-white text-black border border-gray-300 pr-10"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-0 top-1/4 transform -translate-y-1/2"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={() => { trigger(); }} disabled={!isValid || loading} className="bg-blue-600 text-white hover:bg-blue-700">
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>
        </Form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
          Not an admin?{' '}
          <a href="/login" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
            Sign in here
          </a>
        </div>
      </>
    );
  }
  return (
    <>
      <Button
        className="fixed top-6 right-8 bg-white text-red-700 border border-red-700 hover:bg-red-50 font-semibold shadow z-50"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box', padding: '0 2vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '90vh' }}>
        <AdminDashboard />
      </div>
    </>
  );
};

export default AdminLogin;
