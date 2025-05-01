import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { AppStateContext } from '../app/hello/Hello.appStateContext';
import UsersListItem from './UsersList_item';
import styles from './UsersList.module.css';

export default function UsersList() {
  const { 
    allUsersData
  } = useContext(AppStateContext);

  if (!allUsersData) return null; // there isn't yet a search result set available for this query. Render nothing for now.
  
  const UsersListItemEls: JSX.Element[] = [];
  Object.values(allUsersData).forEach((user) => {
    UsersListItemEls.push(
      <UsersListItem key={user.id} {...user} />
    );
  });

  if (UsersListItemEls.length === 0) return null;
  
  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <ul className={`usersList ${styles.usersList}`}>
          {UsersListItemEls}
      </ul>
    </div>
  );
}
