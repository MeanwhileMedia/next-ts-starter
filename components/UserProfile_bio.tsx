import Typography from '@mui/material/Typography';
import { UserInfoTypes } from '../lib/externalApiResponseTypes';
import styles from './UserProfile_bio.module.css';

export default function UserProfile_bio(props: UserInfoTypes) {
  return (
    <div className={`userProfile_bio ${styles.userProfile_bio_info}`}>
      <div className={styles.userProfile_bio_info_name}>
        <Typography variant='h2'>{`${props.first_name || ''} ${props.last_name || ''}`}</Typography>
      </div>
      <Typography variant='body1'>{`${props.stats.current_streak_in_days}-day Streak`}</Typography>
      <Typography variant='body1'>{`${props.stats.total_sessions_played} Sessions`}</Typography>
    </div>
  );
}
