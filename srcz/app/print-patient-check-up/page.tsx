'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../../app/globals.css'
import PrintCheckUp from '../print-check-up/print-check-up'
import { VietQR } from '../utils/vietQR'
import { QRCodeCanvas } from 'qrcode.react'
import { steps } from '../constants'
import Step from '../components/Step'
import ButtonFooter from '../lib/ButtonFooter'
import { usePatientContext } from '../PatientProvider'
import { formatCurrency } from '@/lib/utils'
import { INITIAL_PATIENT } from '../PatientContext'
import { useRouter } from 'next/navigation'

export default function CheckUp() {
    const { patientInfo: { personalInfo, consultationSession }, setPatientInfo } = usePatientContext();
    const router = useRouter()

    const [qrLink, setQrLink] = useState<VietQR | null>(null);
    const qrCodeRef = useRef<HTMLDivElement | null>(null);
    const [urlImage, setUrlImage] = useState<string>();
    const test = useRef(null);
    const handleConverse = () => {
        const qrCodeCanvas = qrCodeRef.current?.querySelector("canvas");
        const qrCodeDataURL = qrCodeCanvas?.toDataURL() || "";
        return qrCodeDataURL;
    };

    const handleGenarateQr = () => {
        const vietQR = new VietQR();

        vietQR
            .setBeneficiaryOrganization(`970418`, "2601386559")
            .setTransactionAmount(`1000000`)
            .setAdditionalDataFieldTemplate("Thanh toan hoa don");
        return vietQR;
    };

    useEffect(() => {
        const qr = handleGenarateQr();

        if (consultationSession?.isInsurance) setQrLink(null);
        else setQrLink(qr);
    }, []);

    useEffect(() => {
        if (qrLink) {
            const imageUrl = handleConverse()
            setUrlImage(imageUrl)
        }
    }, [qrLink])
    const handleNext = () => {
        setPatientInfo(INITIAL_PATIENT)
        router.push('/')
    }
    return (
        <div className='h-full w-full content flex justify-center align-middle tall:items-center p-[3%]'>
            <div className='w-full p-2 h-full flex flex-col'>
                <div className='text-center font-bold text-3xl tall:text-4xl py-5'>
                    <h1>Phiếu khám bệnh</h1>
                </div>
                <Step step={3} steps={steps} />
                <div className="flex-grow bg-slate-100 p-6">
                    <div className='flex-grow border tall:text-4xl border-solid-#333 flex flex-col md:flex-row:gap-y-6 flex-wrap relative gap-4 tall:gap-14 xl:gap-4 p-[3%] w-[800px] m-auto bg-white'>
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

                        <div className='flex'>
                            <label className='w-2/5 inline-block text-#333' htmlFor=''>
                                Giới tính:
                            </label>
                            <b className='w-3/5'>{personalInfo?.data.gender || "Nam"}</b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Ngày sinh:
                            </label>
                            <b className='w-3/5'>
                                {personalInfo?.data.dateOfBirth || "20-12-2003"}
                            </b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Dịch vụ:
                            </label>
                            <b className='w-3/5'>
                                {consultationSession?.service?.name || "Khám nội"}
                            </b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Phòng:
                            </label>
                            <b className='w-3/5'>
                                {consultationSession?.clinic?.name || "KDV1-Phòng khám"}
                            </b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Đối tượng:
                            </label>
                            <b className='w-3/5'>
                                {consultationSession?.target?.name || "Viện phí"}
                            </b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Mã bệnh án:
                            </label>
                            <b className='w-3/5'>
                                {consultationSession?.medicalRecordNumber || "IT049237584"}
                            </b>
                        </div>

                        <div className='flex'>
                            <label className='w-2/5 inline-block' htmlFor=''>
                                Cần thanh toán:
                            </label>
                            <b className='w-3/5'>
                                {formatCurrency(
                                    consultationSession?.isInsurance
                                        ? 0
                                        : consultationSession?.total || 1000000
                                )}
                            </b>
                        </div>
                    </div>
                </div>
                {qrLink && urlImage && (
                    <PrintCheckUp qrlink={qrLink} urlImage={urlImage} />
                )}
                <div className=''>
                    <ButtonFooter
                        prev={
                            consultationSession?.isInsurance
                                ? "/medicalregistration"
                                : "check-up"
                        }
                        next={"/"}
                    />
                </div>
            </div>
        </div>
    );
}
