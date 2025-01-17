'use client'
import React from 'react'
import Print from '../components/Print'
import { VietQR } from '../utils/vietQR'
import Image from 'next/image'
import { usePatientContext } from '../PatientProvider'
import { formatCurrency } from '@/lib/utils'

interface IprintCheckUp {
  qrlink?: VietQR
  urlImage?: string
}

export default function PrintCheckUp({ urlImage }: IprintCheckUp) {
  const { patientInfo: { personalInfo, consultationSession } } = usePatientContext();

  return (
    <Print isPrintImmediately>
      <div
        style={{
          flexGrow: 1,
          border: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          position: 'relative',
          gap: '4%',
          padding: '3%',
          margin: 'auto',
          backgroundColor: 'white',
        }}
      >
        <div style={{ display: 'flex' }}>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', flexGrow: 1 }}>
            {consultationSession?.clinic?.name || "TP3"}
          </h1>
          {urlImage && (
            <div style={{ width: "100px", height: "100px" }}>
              <Image height={80} width={80} alt='qrcode' src={urlImage} />
              {/* <Image
                height={25}
                width={25}
                alt='bidvlogo'
                src={'/image/logoQR.jpg'}
                loading='eager'
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              /> */}
            </div>
          )}
        </div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.25rem', padding: '3%', width: '100%' }}>
          {personalInfo?.data.personName || "Trần Văn Quang"}
        </h1>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block', color: '#333' }}>Giới tính:</label>
          <b style={{ width: '60%' }}>{personalInfo?.data.gender || "Nam"}</b>
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block' }}>Ngày sinh:</label>
          <b style={{ width: '60%' }}>{personalInfo?.data.dateOfBirth || "20-12-2003"}</b>
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block' }}>Dịch vụ:</label>
          <b style={{ width: '60%' }}>{consultationSession?.service?.name || "Khám nội"}</b>
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block' }}>Đối tượng:</label>
          <b style={{ width: '60%' }}>{consultationSession?.target?.name || "Viện phí"}</b>
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block' }}>Mã bệnh án:</label>
          <b style={{ width: '60%' }}>{consultationSession?.medicalRecordNumber || "IT049237584"}</b>
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40%', display: 'inline-block' }}>Cần thanh toán:</label>
          <b style={{ width: '60%' }}>{formatCurrency(consultationSession?.total || 1000000)}</b>
        </div>
      </div>
    </Print>
  )
}

