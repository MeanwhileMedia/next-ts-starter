import type { Metadata } from 'next'
import { AppStateContextProvider } from '../Hello.appStateContext';
import HelloUser from './HelloUser';

const siteTitle = 'App User Profile';
const siteDescription = 'Info for this user.';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {  
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
    ]
  }
}

export default async function Index({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  return (
    <AppStateContextProvider>
      <HelloUser id={id} />
    </AppStateContextProvider>
  )
}
