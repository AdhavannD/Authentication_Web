import { render, screen } from '@testing-library/react';
import { Dialog } from '../components/ui/dialog';

describe('Dialog', () => {
  it('renders children', () => {
    render(<Dialog>Dialog Content</Dialog>);
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });
});
