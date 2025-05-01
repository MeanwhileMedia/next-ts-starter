'use client';
import { useContext, useEffect } from 'react';
import { AppStateContext } from '../Hello.appStateContext';
import { ensureSingleUserData } from '../Hello.helpers';
import UserProfile from '../../../components/UserProfile';

export default function HelloUser(props: { id: number }) {
  const appStateContext = useContext(AppStateContext);
  
  useEffect(() => {
    // This page (UserProfile) only requires user info for a single user. Fetch it now.
    ensureSingleUserData(props.id, appStateContext);
  });

  if (appStateContext.allUsersData === null || !appStateContext.allUsersData[props.id]) return null;

  const thisUserData = appStateContext.allUsersData[props.id];
  return (
    <div>
      <UserProfile {...thisUserData} />
    </div>
  )
}
