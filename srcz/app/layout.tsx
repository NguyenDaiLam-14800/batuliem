import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import './globals.css'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import PatientProvider from './PatientProvider'
import LoadingProvider from './LoadingProvider'
import ButtonExitButtonExit from './ui/ButtonExit'

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
                <header className='fixed top-0 z-50 flex justify-between items-center bg-[var(--niad-color)] h-[50px] tall:h-[120px] w-full px-[3%]'>
                  <ButtonExitButtonExit />
                  <div className='flex items-center'>
                    <div className='hidden tall:block'>
                      <Image
                        className='dark:invert'
                        src='/image/logo-than-bg-transparent.png'
                        alt='NIAD'
                        width={70}
                        height={70}
                      />
                    </div>
                    <div className="tall:hidden">
                      <Image
                        className='dark:invert'
                        src='/image/logo-than-bg-transparent.png'
                        alt='NIAD'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='text-white uppercase md:text-3xl font-bold ml-2'>
                      Bệnh viện thận Hà Nội
                    </span>
                  </div>
                  <Link href='/' className="">
                    <HomeIcon className='text-white text-4xl' />
                  </Link>
                </header>
                <div className='overflow-y-auto w-full justify-center mt-[50px] h-[calc(100vh-50px)] tall:h-[calc(100vh-120px)] tall:mt-[120px]'>
                  {children}
                </div>
              </div>
            </div>
          </LoadingProvider>
        </PatientProvider>
      </body>
    </html>
  )
}
