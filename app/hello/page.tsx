import type { Metadata } from 'next'
import { AppStateContextProvider } from './Hello.appStateContext';
import Hello from './Hello';

const siteTitle = 'All App Users';
const siteDescription = 'A list of all users of the app.';

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

export default function Index() {
  return (
    <AppStateContextProvider>
      <Hello />
    </AppStateContextProvider>
  )
}
