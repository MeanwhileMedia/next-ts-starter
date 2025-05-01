import { UserInfoTypes } from '../lib/externalApiResponseTypes';
import UserProfile_bio from './UserProfile_bio';
import styles from './UserProfile.module.css';

export default function UserProfile(props: UserInfoTypes) {
  return (
    <div className={styles.userProfile}>
      <UserProfile_bio {...props} />
    </div>
  );
}
