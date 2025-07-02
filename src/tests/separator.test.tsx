import { render } from '@testing-library/react';
import { Separator } from '../components/ui/separator';

describe('Separator', () => {
  it('renders separator', () => {
    render(<Separator />);
    // No error means it rendered
    expect(true).toBe(true);
  });
});
