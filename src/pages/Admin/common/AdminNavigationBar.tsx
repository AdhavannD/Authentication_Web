import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

interface AdminNavigationBarProps {
  activeTab: 'users' | 'customers' | 'addAdmin' | 'history';
  onTabChange: (tab: 'users' | 'customers' | 'addAdmin' | 'history') => void;
}

const AdminNavigationBar = ({ activeTab, onTabChange }: AdminNavigationBarProps) => (
  <nav className="admin-nav">
    <NavigationMenu>
      <NavigationMenuList style={{ display: 'flex', gap: 24, padding: '0.5rem 2rem' }}>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={activeTab === 'users'}
            onClick={() => onTabChange('users')}
            style={{
              fontWeight: activeTab === 'users' ? 700 : 500,
              color: activeTab === 'users' ? '#1976d2' : '#232946',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'users' ? '2px solid #1976d2' : '2px solid transparent',
              padding: '0.5rem 1.2rem',
              background: 'none',
              outline: 'none',
            }}
          >
            Users
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={activeTab === 'customers'}
            onClick={() => onTabChange('customers')}
            style={{
              fontWeight: activeTab === 'customers' ? 700 : 500,
              color: activeTab === 'customers' ? '#1976d2' : '#232946',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'customers' ? '2px solid #1976d2' : '2px solid transparent',
              padding: '0.5rem 1.2rem',
              background: 'none',
              outline: 'none',
            }}
          >
            Customers
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={activeTab === 'history'}
            onClick={() => onTabChange('history')}
            style={{
              fontWeight: activeTab === 'history' ? 700 : 500,
              color: activeTab === 'history' ? '#1976d2' : '#232946',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'history' ? '2px solid #1976d2' : '2px solid transparent',
              padding: '0.5rem 1.2rem',
              background: 'none',
              outline: 'none',
            }}
          >
            History
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={activeTab === 'addAdmin'}
            onClick={() => onTabChange('addAdmin')}
            style={{
              fontWeight: activeTab === 'addAdmin' ? 700 : 500,
              color: activeTab === 'addAdmin' ? '#1976d2' : '#232946',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'addAdmin' ? '2px solid #1976d2' : '2px solid transparent',
              padding: '0.5rem 1.2rem',
              background: 'none',
              outline: 'none',
            }}
          >
            Add Admin
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
);

export default AdminNavigationBar;
