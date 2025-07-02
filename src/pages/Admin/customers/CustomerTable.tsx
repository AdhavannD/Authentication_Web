import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Customer {
  customer_id: number;
  user_id?: number;
  name: string;
  email: string;
  token?: string;
  deleted_at?: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (customer_id: number) => void;
  sortOrder: 'asc' | 'desc';
}

const CustomerTable = ({ customers, onDelete, sortOrder }: CustomerTableProps) => {
  const navigate = useNavigate();

  const sortedCustomers = [...customers].sort((a, b) => {
    const aId = a.user_id ?? a.customer_id;
    const bId = b.user_id ?? b.customer_id;
    return sortOrder === 'asc' ? aId - bId : bId - aId;
  });

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse', background: '#f5f7fa', borderRadius: 8, fontSize: '1.28rem' }}>
        <TableHeader>
          <TableRow style={{ background: '#e3eafc' }}>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>User ID</TableHead>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Name</TableHead>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Email</TableHead>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map(c => (
            <TableRow key={c.customer_id}>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.user_id ?? c.customer_id}</TableCell>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.name}</TableCell>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{c.email}</TableCell>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc', textAlign: 'center' }}>
                <Button variant="ghost" style={{ background: 'none', border: 'none', padding: 0, marginRight: 16, cursor: 'pointer' }} onClick={() => navigate(`/admin/edit-customer/${c.customer_id}`)} title="Edit">
                  <FaEdit color="#1976d2" size={18} style={{ verticalAlign: 'middle' }} />
                </Button>
                <Button variant="destructive" style={{ background: 'none', border: 'none', padding: 0, marginLeft: 0, cursor: 'pointer' }} onClick={() => onDelete(c.customer_id)} title="Delete">
                  <FaTrash color="#d32f2f" size={18} style={{ verticalAlign: 'middle' }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
