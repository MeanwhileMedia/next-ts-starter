import Link from 'next/link'
import { Person } from '@mui/icons-material';
import { UserInfoTypes } from '../lib/externalApiResponseTypes';
import styles from './UsersList_item.module.css';
import { Typography } from '@mui/material';

export default function UsersListItem(props: UserInfoTypes) {
  let userAvatar = <Person fontSize='inherit' />;
  if (props.image) userAvatar = <img src={`data:image/png;base64,${props.image}`} alt={`Avatar for ${props.first_name} ${props.last_name}`} />
  
  return (
    <li className={styles.usersListItem}>
      <Link href={`/hello/${props.id}`}>
        <span className={styles.usersListItem_avatar}>
          {userAvatar}
        </span>
        <span className={styles.usersListItem_name}>
          <Typography variant='h5'>{`${props.first_name || ''} ${props.last_name || ''}`}</Typography>
        </span>
      </Link>
    </li>
  );
}
