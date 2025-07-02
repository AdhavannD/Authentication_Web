import { Input } from '../../../components/ui/input';

interface CustomerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSearchBar = ({ value, onChange }: CustomerSearchBarProps) => (
  <Input
    placeholder="Search by name or email"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full"
    style={{ maxWidth: 400 }}
  />
);

export default CustomerSearchBar;
