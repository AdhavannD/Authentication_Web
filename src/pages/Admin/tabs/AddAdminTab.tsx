import AddAdminForm from '../auth/AddAdminForm';
import type { FC } from 'react';


interface AddAdminTabProps {
  setAddSuccess: (b: boolean) => void;
}

const AddAdminTab: FC<AddAdminTabProps> = ({ setAddSuccess }) => (
  <div style={{ textAlign: 'center', marginTop: 40, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
    <AddAdminForm onAdd={() => setAddSuccess(true)} />
  </div>
);

export default AddAdminTab;
