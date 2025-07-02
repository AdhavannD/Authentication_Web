import { Input } from '@/components/ui/input';

interface CustomerUserIdSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerUserIdSearchBar = ({ value, onChange }: CustomerUserIdSearchBarProps) => (
  <Input
    placeholder="Search by User ID"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full"
    style={{ maxWidth: 200 }}
    type="number"
    min={0}
  />
);

export default CustomerUserIdSearchBar;
