import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerSchema } from '@/schemas/registerSchema';
import { addAdmin } from '@/services/admin/adminService';
import { z } from 'zod';

// Use the same validation as user register for admin add
const addAdminSchema = registerSchema;

type AddAdminInputs = z.infer<typeof addAdminSchema>;

const AddAdminForm = ({ onAdd }: { onAdd?: (admin: any) => void }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<AddAdminInputs>({
    resolver: zodResolver(addAdminSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { handleSubmit, formState: { isValid }, trigger, control } = form;

  const onSubmit = async (data: AddAdminInputs) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('admin_access_token');
      if (!token) throw new Error('No admin token found');
      await addAdmin(token, data);
      if (onAdd) onAdd(data);
      // Show toast for success
      import('react-hot-toast').then(({ toast }) => toast.success('Admin added successfully!'));
    } catch (err: any) {
      setError(err.message || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', width: '100%' }}></h2>
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}
          <Button type="submit" onClick={() => { trigger(); }} disabled={!isValid || loading} className="bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Adding..." : "Add Admin"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddAdminForm;
