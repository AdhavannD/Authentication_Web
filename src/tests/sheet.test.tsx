import { render, screen } from '@testing-library/react';
import { Sheet } from '../components/ui/sheet';

describe('Sheet', () => {
  it('renders children', () => {
    render(<Sheet>Sheet Content</Sheet>);
    expect(screen.getByText('Sheet Content')).toBeInTheDocument();
  });
});
