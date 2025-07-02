import { render, screen } from '@testing-library/react';
import { NavigationMenu } from '../components/ui/navigation-menu';

describe('NavigationMenu', () => {
  it('renders children', () => {
    render(<NavigationMenu>Menu Content</NavigationMenu>);
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
  });
});
