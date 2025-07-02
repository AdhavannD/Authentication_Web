import { render, screen } from '@testing-library/react';
import { Alert } from '../components/ui/alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert variant="default">Test Alert</Alert>);
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
  });
});
