import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface UsersTableProps {
  users: User[];
  onDelete?: (userId: number) => void;
  onEdit?: (user: User) => void;
}

const UsersTable = ({ users, onDelete, onEdit }: UsersTableProps) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
      <Table style={{ width: '100%', minWidth: 800, maxWidth: '100%', borderCollapse: 'collapse', background: '#f5f7fa', borderRadius: 8, fontSize: '1.28rem' }}>
        <TableHeader>
          <TableRow style={{ background: '#e3eafc' }}>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Name</TableHead>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Email</TableHead>
            <TableHead style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{u.name}</TableCell>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc' }}>{u.email}</TableCell>
              <TableCell style={{ padding: '0.9rem', border: '1px solid #cfd8dc', textAlign: 'center' }}>
                <Button variant="ghost" style={{ background: 'none', border: 'none', padding: 0, marginRight: 16, cursor: 'pointer' }} onClick={() => onEdit && onEdit(u)} title="Edit">
                  <FaEdit color="#1976d2" size={18} style={{ verticalAlign: 'middle' }} />
                </Button>
                <Button variant="destructive" style={{ background: 'none', border: 'none', padding: 0, marginLeft: 0, cursor: 'pointer' }} onClick={() => onDelete && onDelete(u.id)} title="Delete">
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

export default UsersTable;
