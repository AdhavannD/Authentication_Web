import { render, screen } from '@testing-library/react';
import { Label } from '../components/ui/label';

describe('Label', () => {
  it('renders label', () => {
    render(<Label htmlFor="test">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});
