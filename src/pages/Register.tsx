import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/registerSchema';
import type { RegisterFormInputs } from '../schemas/registerSchema';
import API from '../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form";
import { toast } from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, formState: { isValid }, reset, trigger, control } = form;

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await API.post('/register', data);
      toast.success('Registered successfully!');
      reset();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Error creating user');
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', width: '100%' }}>Register a new User</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }} noValidate>
          <FormField
            name="name"
            control={control}
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
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" className="bg-white text-black border border-gray-300" />
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
                    <Input
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
          <Button type="submit" onClick={() => { trigger(); }} disabled={!isValid} className="bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
        </form>
      </Form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
        Already a user?{' '}
        <a href="/login" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
          Sign in
        </a>
      </div>
    </>
  );
};

export default Register;