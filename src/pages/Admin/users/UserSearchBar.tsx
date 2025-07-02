import { Input } from '../../../components/ui/input';

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const UserSearchBar = ({ value, onChange }: UserSearchBarProps) => (
  <Input
    placeholder="Search by name or email"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full"
    style={{ maxWidth: 400 }}
  />
);

export default UserSearchBar;
