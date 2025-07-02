import { render } from '@testing-library/react';
import { Skeleton } from '../components/ui/skeleton';

describe('Skeleton', () => {
  it('renders skeleton', () => {
    render(<Skeleton />);
    // No error means it rendered
    expect(true).toBe(true);
  });
});
