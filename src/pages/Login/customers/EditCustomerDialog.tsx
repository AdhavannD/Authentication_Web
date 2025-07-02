import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../../../components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import type { UseFormReturn } from 'react-hook-form'; 
import type { CustomerFormInputs } from '../../../schemas/customerSchema';

interface EditCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<CustomerFormInputs>;
  onSubmit: (data: CustomerFormInputs) => void;
}

const EditCustomerDialog = ({ open, onOpenChange, form, onSubmit }: EditCustomerDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Customer</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="bg-red-600 text-white hover:bg-red-700">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="default" disabled={!form.formState.isValid} className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

export default EditCustomerDialog;
