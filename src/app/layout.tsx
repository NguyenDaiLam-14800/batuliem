
import localFont from 'next/font/local'
import './globals.css'
import PatientProvider from './PatientProvider'
import LoadingProvider from './LoadingProvider'
import { Suspense } from 'react'


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100vh]`}
      >
        <PatientProvider>
          <LoadingProvider>
            <div className='h-screen flex'>
              <div className='w-full min-h-screen m-auto items-center flex flex-col relative'>
                <div className='overflow-y-auto w-full justify-center '>
                  <Suspense fallback={<div>Loading...</div>}>
                    {children}
                  </Suspense>
                </div>
              </div>
            </div>
          </LoadingProvider>
        </PatientProvider>
      </body>
    </html>
  )
}
