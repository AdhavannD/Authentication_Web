import UserSearchBar from '../users/UserSearchBar';
import UsersTable from '../users/UsersTable';
import type { FC } from 'react';

interface UsersTabProps {
  users: any[];
  userSearch: string;
  setUserSearch: (s: string) => void;
  onDelete: (userId: number) => void;
  onEdit: (user: any) => void;
}

const UsersTab: FC<UsersTabProps> = ({ users, userSearch, setUserSearch, onDelete, onEdit }) => (
  <>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16, gap: '1.2rem', flexWrap: 'wrap' }}>
      <UserSearchBar value={userSearch} onChange={setUserSearch} />
    </div>
    <UsersTable users={users} onDelete={onDelete} onEdit={onEdit} />
  </>
);

export default UsersTab;
