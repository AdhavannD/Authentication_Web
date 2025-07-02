import CustomerSearchBar from '../customers/CustomerSearchBar';
import CustomerUserIdSearchBar from '../customers/CustomerUserIdSearchBar';
import AdminCustomerTable from '../customers/CustomerTable';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { FC } from 'react';

interface CustomersTabProps {
  customers: any[];
  customerSearch: string;
  setCustomerSearch: (s: string) => void;
  customerUserIdSearch: string;
  setCustomerUserIdSearch: (s: string) => void;
  customerSortOrder: 'asc' | 'desc';
  setCustomerSortOrder: (o: 'asc' | 'desc') => void;
  onDelete: (customerId: number) => void;
}

const CustomersTab: FC<CustomersTabProps> = ({ customers, customerSearch, setCustomerSearch, customerUserIdSearch, setCustomerUserIdSearch, customerSortOrder, setCustomerSortOrder, onDelete }) => (
  <>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16, gap: '1.2rem', flexWrap: 'wrap' }}>
      <CustomerSearchBar value={customerSearch} onChange={setCustomerSearch} />
      <CustomerUserIdSearchBar value={customerUserIdSearch} onChange={setCustomerUserIdSearch} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 500 }}>Sort by:</span>
        <RadioGroup value={customerSortOrder} onValueChange={val => setCustomerSortOrder(val as 'asc' | 'desc')} style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RadioGroupItem value="asc" id="customer-sort-asc" />
            <label htmlFor="customer-sort-asc" style={{ cursor: 'pointer' }}>Ascending</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RadioGroupItem value="desc" id="customer-sort-desc" />
            <label htmlFor="customer-sort-desc" style={{ cursor: 'pointer' }}>Descending</label>
          </div>
        </RadioGroup>
      </div>
    </div>
    <AdminCustomerTable customers={customers} onDelete={onDelete} sortOrder={customerSortOrder} />
  </>
);

export default CustomersTab;
