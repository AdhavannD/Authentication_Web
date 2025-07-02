import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaUndo } from 'react-icons/fa';

interface Customer {
  customer_id: number;
  user_id?: number;
  name: string;
  email: string;
  token?: string;
  deleted_at?: string;
}

interface CustomerTableHistoryProps {
  customers: Customer[];
  onRestore?: (customer_id: number) => void;
}

const CustomerTableHistory = ({ customers, onRestore }: CustomerTableHistoryProps) => (
  <div style={{ width: '100%', overflowX: 'auto' }}>
    <Table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse', background: '#f5f7fa', borderRadius: 8, fontSize: '1.15rem' }}>
      <TableHeader>
        <TableRow style={{ background: '#e3eafc' }}>
          <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>User ID</TableHead>
          <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Name</TableHead>
          <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Email</TableHead>
          <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Deleted At</TableHead>
          {onRestore && <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map(c => (
          <TableRow key={c.customer_id}>
            <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.user_id ?? c.customer_id}</TableCell>
            <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.name}</TableCell>
            <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.email}</TableCell>
            <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.deleted_at}</TableCell>
            {onRestore && (
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc', textAlign: 'center' }}>
                <Button variant="outline" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => onRestore(c.customer_id)} title="Restore">
                  <FaUndo color="#388e3c" size={18} style={{ verticalAlign: 'middle' }} />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default CustomerTableHistory;
