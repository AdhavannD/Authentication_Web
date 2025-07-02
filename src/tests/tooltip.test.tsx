import { render, screen } from '@testing-library/react';
import { Tooltip } from '../components/ui/tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip>Tooltip Content</Tooltip>);
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
  });
});
