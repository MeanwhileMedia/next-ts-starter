import { AllUsersIdsTypes, UserInfoTypes } from '../../lib/externalApiResponseTypes';
import { AppStateContextTypes } from './Hello.appStateContext';

export async function fetchAllUsersIds(): Promise<AllUsersIdsTypes|null>{
  try {
    const response = await fetch(`/api/hello`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} for users data request query`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchAllUsersIds:', error);
    return null;
  }
}
export async function ensureAllUsersIds(appStateContext:AppStateContextTypes) {
  if (appStateContext.allUsersIds !== null) return; // If data already exists, do not fetch again
  if (appStateContext.allUsersIdsReqPending === true) return;

  // Execute API req to get all users IDs
  console.log('Fetching all users IDs...');
  appStateContext.allUsersIdsReqPending = true;
  fetchAllUsersIds().then((response) => {
    if (!response) return;
    console.log('Fetched all users ids:', response);
    appStateContext.setAllUsersIds({ ...response });
    appStateContext.allUsersIdsReqPending = false;
  });
}

export async function fetchUserData(userId:number): Promise<UserInfoTypes|null> {
  try {
    const response = await fetch(`/api/hello/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} for users data request query`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchUserData:', error);
    return null;
  }
}
export async function ensureSingleUserData(userId:number, appStateContext:AppStateContextTypes) {
  if (appStateContext.allUsersData !== null && appStateContext.allUsersData[userId]) return; // If all needed data already exists, do not fetch again
  if (appStateContext.allUsersDataReqPending === true) return;
  
  appStateContext.allUsersDataReqPending = true;
  fetchUserData(userId).then((response) => {
    if (!response) return;
    console.log('Fetched single user data:', response);
    const allUsersData:AppStateContextTypes["allUsersData"] = {};

    appStateContext.allUsersData = appStateContext.allUsersData || {};
    appStateContext.allUsersData[userId] = response;
    appStateContext.setAllUsersData({ ...appStateContext.allUsersData });
    appStateContext.allUsersDataReqPending = false;
  });
}

// This is an example function for ensuring a batch of API requests execute.
export async function ensureAllUsersData(appStateContext:AppStateContextTypes) { 
  if (appStateContext.allUsersIds === null) return; // Waiting on allUsersIds req to respond. We need those ids before we can fetch user data.
  if (appStateContext.allUsersDataReqPending === true) return;
  if (appStateContext.allUsersData !== null && Object.keys(appStateContext.allUsersData).length === appStateContext.allUsersIds.user_ids.length) return; // If all needed data already exists, do not fetch again
  
  // Execute multiple API reqs to get all users data
  console.log('Fetching all users Data...');
  appStateContext.allUsersDataReqPending = true;
  const allUsersDataFetchPromises = []
  for (let i = 0; i < appStateContext.allUsersIds.user_ids.length; i++) {
    allUsersDataFetchPromises.push(fetchUserData(appStateContext.allUsersIds.user_ids[i]));
  }
  Promise.all(allUsersDataFetchPromises).then((responses) => {
    console.log('Fetched all users data:', responses);
    const allUsersData:AppStateContextTypes["allUsersData"] = {};
    for (let i = 0; i < responses.length; i++) {
      if (responses[i] !== null) allUsersData[responses[i]!.id] = responses[i]!;
    }
    appStateContext.setAllUsersData(allUsersData);
    appStateContext.allUsersDataReqPending = false;
  });
}