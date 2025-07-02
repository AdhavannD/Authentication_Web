
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '../../../components/ui/navigation-menu';

interface NavigationBarProps {
  activeTab: 'home' | 'history';
  onTabChange: (tab: 'home' | 'history') => void;
}

const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  return (
    <nav style={{ width: '100%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 24 }}>
      <NavigationMenu>
        <NavigationMenuList style={{ display: 'flex', gap: 24, padding: '0.5rem 2rem' }}>
          <NavigationMenuItem>
            <NavigationMenuLink
              active={activeTab === 'home'}
              onClick={() => onTabChange('home')}
              style={{
                fontWeight: activeTab === 'home' ? 700 : 500,
                color: activeTab === 'home' ? '#1976d2' : '#232946',
                fontSize: '1.1rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'home' ? '2px solid #1976d2' : '2px solid transparent',
                padding: '0.5rem 1.2rem',
                background: 'none',
                outline: 'none',
              }}
            >
              Home
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
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavigationBar;
