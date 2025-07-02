import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema } from '../../../schemas/customerSchema';
import type { CustomerFormInputs } from '../../../schemas/customerSchema';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../../../services/customer/customerService';
import { Button } from '../../../components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';

const AddCustomerPage = () => {
  const navigate = useNavigate();
  const form = useForm<CustomerFormInputs>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: CustomerFormInputs) => {
    const token = localStorage.getItem('user_access_token') || localStorage.getItem('access_token');
    if (!token) return;
    await addCustomer(token, data);
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="form-card" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', maxWidth: 500, width: '100%', margin: '2.5rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: '2.5rem 2.5rem 2rem 2.5rem' }}>
      <h2 style={{ textAlign: 'center', width: '100%', fontWeight: 700, color: '#1976d2', marginBottom: '2rem', fontSize: '2rem', letterSpacing: 0.5 }}>Add Customer</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }} noValidate>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" autoFocus className="bg-white text-black border border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" className="bg-white text-black border border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <Button type="button" variant="destructive" onClick={() => navigate(-1)} className="bg-red-600 text-white hover:bg-red-700" style={{ minWidth: 120, fontWeight: 600 }}>Cancel</Button>
            <Button type="submit" variant="default" disabled={!form.formState.isValid} className="bg-blue-600 text-white hover:bg-blue-700" style={{ minWidth: 120, fontWeight: 600 }}>Add</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCustomerPage;
