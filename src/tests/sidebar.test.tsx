import { render, screen } from '@testing-library/react';
import { Sidebar, SidebarProvider } from '../components/ui/sidebar';

describe('Sidebar', () => {
  it('renders children', () => {
    render(
      <SidebarProvider>
        <Sidebar>Sidebar Content</Sidebar>
      </SidebarProvider>
    );
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
  });
});
