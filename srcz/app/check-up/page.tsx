'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../../app/globals.css'
import { VietQR } from '../utils/vietQR'
import { QRCodeCanvas } from 'qrcode.react'
import { steps } from '../constants'
import Step from '../components/Step'
import ButtonFooter from '../lib/ButtonFooter'
import { usePatientContext } from '../PatientProvider'
import { formatCurrency } from '@/lib/utils'

export default function CheckUp() {
  const { patientInfo: { personalInfo, consultationSession } } = usePatientContext();

  const [qrLink, setQrLink] = useState<VietQR | null>(null)
  const qrCodeRef = useRef<HTMLDivElement | null>(null)
  const [urlImage, setUrlImage] = useState<string>()
  const test = useRef(null)
  const handleConverse = () => {
    const qrCodeCanvas = qrCodeRef.current?.querySelector('canvas')
    const qrCodeDataURL = qrCodeCanvas?.toDataURL() || ''
    return qrCodeDataURL
  }

  const handleGenarateQr = () => {
    const vietQR = new VietQR()

    vietQR
      .setBeneficiaryOrganization(`970418`, '2601386559')
      .setTransactionAmount(`1000000`)
      .setAdditionalDataFieldTemplate('Thanh toan hoa don')
    return vietQR
  }

  useEffect(() => {
    const qr = handleGenarateQr()
    setQrLink(qr)
  }, [])

  useEffect(() => {
    if (qrLink) {
      const imageUrl = handleConverse()
      setUrlImage(imageUrl)
    }
  }, [qrLink])

  return (
    <div className='h-full w-full content flex justify-center align-middle tall:items-center p-[3%]'>
      <div className='w-full p-2 h-full flex flex-col'>
        <div className='text-center font-bold text-3xl tall:text-4xl py-5'>
          <h1>Thanh toán</h1>
        </div>
        <Step step={2} steps={steps} />
        <div className='flex-grow border tall:text-4xl border-solid-#333 flex flex-col md:flex-row:gap-y-6 flex-wrap relative gap-4 tall:gap-14 xl:gap-4 p-[3%]'>
          <div className="flex">
            <h1 className='text-center font-bold text-4xl py-3 tall:text-7xl flex-grow'>
              {consultationSession?.clinic?.name || "TP3"}
            </h1>
            <div className=''>
              {qrLink && (
                <div ref={qrCodeRef} className='rounded-xl w-full h-full'>
                  <QRCodeCanvas
                    ref={test}
                    value={qrLink.build()}
                    size={200}
                    level='H'
                    imageSettings={{
                      src: '/image/logoQR.jpg',
                      height: 50,
                      width: 50,
                      excavate: true
                    }}
                    className='bg-white rounded-xl hidden tall:block'
                  />
                  <QRCodeCanvas
                    ref={test}
                    value={qrLink.build()}
                    size={100}
                    level='H'
                    imageSettings={{
                      src: '/image/logoQR.jpg',
                      height: 25,
                      width: 25,
                      excavate: true
                    }}
                    className='bg-white rounded-xl tall:hidden'
                  />
                </div>
              )}
            </div>
          </div>
          <h1 className='text-center font-bold text-xl py-3 w-full tall:text-4xl'>
            {personalInfo?.data.personName || "Trần Văn Quang"}
          </h1>

          <div className="flex">
            <label className='w-2/5 inline-block text-#333' htmlFor=''>
              Giới tính:
            </label>
            <b className='w-3/5'>{personalInfo?.data.gender || "Nam"}</b>
          </div>

          <div className="flex">
            <label className='w-2/5 inline-block' htmlFor=''>
              Ngày sinh:
            </label>
            <b className='w-3/5'>{personalInfo?.data.dateOfBirth || "20-12-2003"}</b>
          </div>

          <div className="flex">
            <label className='w-2/5 inline-block' htmlFor=''>
              Dịch vụ:
            </label>
            <b className='w-3/5'>{consultationSession?.service?.name || "Khám nội"}</b>
          </div>

          <div className="flex">
            <label className='w-2/5 inline-block' htmlFor=''>
              Đối tượng:
            </label>
            <b className='w-3/5'>{consultationSession?.target?.name || "Viện phí"}</b>
          </div>

          <div className="flex">
            <label className='w-2/5 inline-block' htmlFor=''>
              Mã bệnh án:
            </label>
            <b className='w-3/5'>{consultationSession?.medicalRecordNumber || "IT049237584"}</b>
          </div>

          <div className="flex">
            <label className='w-2/5 inline-block' htmlFor=''>
              Cần thanh toán:
            </label>
            <b className='w-3/5'>{formatCurrency(consultationSession?.total || 1000000)}</b>
          </div>
        </div>
        <div className=''>
          <ButtonFooter next={"/pay"} prev={"/medicalregistration"} />
        </div>
      </div>
    </div>
  )
}
