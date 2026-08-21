import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://karunatravels.com'),
  title: {
    default: 'Karuna Travels | Best Travel Agency in Delhi | Just Tourism',
    template: '%s | Karuna Travels Delhi',
  },
  description:
    "Karuna Travels — Delhi's trusted travel agency. Book tour packages to Shimla, Manali, Kashmir, Goa, Rajasthan & car rentals. Just Tourism — Explore · Travel · Enjoy. Call +91-9911209636",
  keywords: [
    'travel agency Delhi',
    'tour packages Delhi',
    'Karuna Travels',
    'Just Tourism Delhi',
    'car rental Delhi',
    'Daryaganj travel agent',
    'Shimla package',
    'Manali tour',
    'Jim Corbett safari',
    'cab booking Delhi',
    'outstation cab Delhi',
    'holiday packages India',
    'travel agency Daryaganj',
    'Kashmir tour package',
    'Goa tour package',
    'Rajasthan tour',
    'Kerala honeymoon package',
    'Dubai tour from Delhi',
    'Ladakh bike trip',
    'Golden Triangle tour',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://karunatravels.com',
    siteName: 'Karuna Travels | Just Tourism',
    title: 'Karuna Travels | Best Travel Agency in Delhi | Just Tourism',
    description:
      "Delhi's trusted travel agency. Book tour packages & car rentals. Explore · Travel · Enjoy.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Karuna Travels — Just Tourism Delhi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@karunatravels',
    title: 'Karuna Travels | Best Travel Agency in Delhi',
    description:
      "Delhi's trusted travel agency for tour packages & car rentals.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
  alternates: {
    canonical: 'https://karunatravels.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter bg-[#F8FAFF] text-[#111827] antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1B2A4A',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: 'var(--font-poppins)',
            },
            success: {
              iconTheme: {
                primary: '#F5A623',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  )
}
