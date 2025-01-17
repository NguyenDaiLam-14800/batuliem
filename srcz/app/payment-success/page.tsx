'use client'
import React, { useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useRouter } from 'next/navigation'

export default function PaymentSuccess() {
  const router = useRouter()

  useEffect(() => {
    const countdown = setInterval(() => {
      router.push('/print-patient-check-up')
    }, 1000);
    return () => {
      clearInterval(countdown)
    }
  }, [])

  return (
    <>
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <div className=' w-4/5 h-4/5  border border-solid border-#ccc rounded flex flex-col justify-center text-center px-5'>
          <div>
            <CheckCircleIcon sx={{ fontSize: '64px', color: 'var(--green)' }} />
          </div>
          <b className='py-5'>Thanh toán thành công</b>
          <p className='text-[12px] text-[#787676]'>
            Người dùng vui lòng đợi trong giây lát để thực hiện in phiếu
          </p>
        </div>
      </div>
    </>
  )
}
