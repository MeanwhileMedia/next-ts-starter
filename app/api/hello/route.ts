import { type NextRequest } from 'next/server';
import { fetchFromExternalApi } from '../../../lib/externalApi.helper';

export async function GET(req: NextRequest) {
  const userApiID = process.env.USER_API_ID;
  const userApiKey = process.env.USER_API_KEY;
  if (!userApiID || !userApiKey) {
    const error = 'Missing USER_API environment variables';
    console.error(error);
    return new Response(JSON.stringify({ error }), { status: 500, statusText: error });
  }

  try {
    const userApiData = await fetchFromExternalApi('users', userApiID, userApiKey); // Returns an object containing array of all user IDs (see interface AllUsersIdsTypes)
    console.log('Fetched data:', userApiData);
    return new Response(JSON.stringify(userApiData), { status: 200 });
  } catch (error) {
    const errorMessage = 'Error fetching data from Users API';
    console.error(errorMessage, error);
    return new Response(JSON.stringify({ error }), { status: 500, statusText: errorMessage });
  }

};
