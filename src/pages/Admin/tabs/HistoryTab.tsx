
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import UserTableHistory from '../users/UserTableHistory';
import CustomerTableHistory from '../customers/CustomerTableHistory';
import type { FC } from 'react';

interface HistoryTabProps {
  historyType: 'customer' | 'user';
  setHistoryType: (t: 'customer' | 'user') => void;
  deletedUsers: any[];
  deletedCustomers?: any[];
}

const HistoryTab: FC<HistoryTabProps> = ({ historyType, setHistoryType, deletedUsers, deletedCustomers }) => (
  <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 24, flexDirection: 'column', width: '100%' }}>
    <RadioGroup value={historyType} onValueChange={val => setHistoryType(val as 'customer' | 'user')}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <RadioGroupItem value="customer" id="customer-history" />
        <label htmlFor="customer-history" style={{ cursor: 'pointer', fontWeight: 500, fontSize: '1.1rem' }}>Customer History</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <RadioGroupItem value="user" id="user-history" />
        <label htmlFor="user-history" style={{ cursor: 'pointer', fontWeight: 500, fontSize: '1.1rem' }}>User History</label>
      </div>
    </RadioGroup>
    <div style={{ width: '100%', marginTop: 24, marginLeft: 32 }}>
      {historyType === 'customer' && (
        <CustomerTableHistory customers={deletedCustomers ?? []} />
      )}
      {historyType === 'user' && (
        <UserTableHistory users={deletedUsers} />
      )}
    </div>
  </div>
);

export default HistoryTab;
