import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Form } from '../components/ui/form';

function FormWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm();
  return <Form {...form}>{children}</Form>;
}

describe('Form', () => {
  it('renders children', () => {
    render(
      <FormWrapper>
        <div>Form Content</div>
      </FormWrapper>
    );
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });
});
