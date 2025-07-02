import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/registerSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { addUser, updateUser, fetchUser } from '@/services/admin/userService';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { z } from "zod";


type UserFormData = {
  name: string;
  email: string;
  password?: string;
};

const editUserSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name is required' })
    .regex(/^[A-Za-z ]+$/, { message: 'Name must only contain letters and spaces' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional().or(z.literal('')),
});

const UserFormPage = ({ isEdit = false, initialData = null }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(isEdit ? editUserSchema : registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialData || { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (isEdit && userId) {
      const token = localStorage.getItem('admin_access_token');
      if (!token) return;
      fetchUser(token, userId).then(user => {
        form.setValue('name', user.name || "");
        form.setValue('email', user.email || "");
      });
    }
    // eslint-disable-next-line
  }, [isEdit, userId]);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (isEdit) {
        const payload: { name: string; email: string; password?: string } = { name: data.name, email: data.email };
        if (data.password && data.password.trim() !== "") {
          payload.password = data.password;
        }
        if (!userId) throw new Error("User ID is missing");
        await updateUser(userId, payload);
        toast.success('User updated successfully!');
      } else {
        // Ensure password is always a string for addUser
        await addUser({
          name: data.name,
          email: data.email,
          password: data.password || ""
        });
        toast.success('User added successfully!');
      }
      navigate(-1); // Go back to previous page
    } catch (err) {
      const error = err as any;
      toast.error(error.response?.data?.detail || "An error occurred while saving the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', maxWidth: 500, width: '100%', margin: '2.5rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: '2.5rem 2.5rem 2rem 2.5rem' }}>
      <h2 style={{ textAlign: 'center', width: '100%', fontWeight: 700, color: '#1976d2', marginBottom: '2rem', fontSize: '2rem', letterSpacing: 0.5 }}>{isEdit ? "Edit User" : "Add User"}</h2>
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
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" minLength={6} className="bg-white text-black border border-gray-300" autoComplete="new-password" />
                </FormControl>
                <FormMessage />
                {isEdit && <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Leave blank to keep the current password.</div>}
              </FormItem>
            )}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <Button type="button" variant="destructive" onClick={() => navigate(-1)} className="bg-red-600 text-white hover:bg-red-700" style={{ minWidth: 120, fontWeight: 600 }}>Cancel</Button>
            <Button type="submit" variant="default" disabled={!form.formState.isValid || loading} className="bg-blue-600 text-white hover:bg-blue-700" style={{ minWidth: 120, fontWeight: 600 }}>{loading ? (isEdit ? "Saving..." : "Adding...") : (isEdit ? "Save" : "Add User")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserFormPage;
