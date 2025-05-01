'use client';
import { useContext, useEffect } from 'react';
import UsersList from '../../components/UsersList';
import { AppStateContext } from './Hello.appStateContext';
import { ensureAllUsersIds, ensureAllUsersData } from './Hello.helpers';

export default function Hello() {
  const appStateContext = useContext(AppStateContext);
  
  useEffect(() => {
    // This page requires that all user ids, and all user info for each id is available before render.
    ensureAllUsersIds(appStateContext);
    ensureAllUsersData(appStateContext);
  });

  return (
    <UsersList />
  )
}
