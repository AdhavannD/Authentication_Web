import { render, screen } from '@testing-library/react';
import { Textarea } from '../components/ui/textarea';

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });
});
