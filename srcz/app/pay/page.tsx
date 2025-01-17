"use client";

import React, { useEffect, useState } from "react";
import { VietQR } from "@/app/pay/vietQR";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import Step from "../components/Step";
import { steps } from "../constants";
import ButtonFooter from "../lib/ButtonFooter";

export default function Pay() {
  const [qrLink, setQrLink] = useState<string | null>();
  const router = useRouter();

  const dataQR = {
    bankId: "970418",
    accountNumber: "42710000478032",
    amount: "500000",
    description: "chuyen khoan",
  };

  const [timeRemaining, setTimeRemaining] = useState(120);

  const handleGenarateQr = () => {
    const vietQR = new VietQR();

    vietQR
      .setBeneficiaryOrganization(dataQR.bankId, dataQR.accountNumber)
      .setTransactionAmount(dataQR.amount)
      .setAdditionalDataFieldTemplate(dataQR.description);

    const qrLinkGenerated = vietQR.build();
    setQrLink(qrLinkGenerated);
  };

  useEffect(() => {
    handleGenarateQr();
    const countdown = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);
  return (
    <div className='flex flex-col items-center justify-between h-full p-[3%]'>
      <h1 className='text-center font-bold text-3xl tall:text-4xl py-5'>
        Thanh toán
      </h1>
      <Step step={2} steps={steps} />
      <div className='bg-white p-4 w-full flex-grow modal-content relative'>
        <div className='p-6'>
          <h2 className='text-xl text-center font-semibold mb-4'>
            Quét Mã QR để Thanh Toán
          </h2>

          <div className='qr-container mt-12'>
            <div className='qr-border flex justify-center mb-4'>
              {qrLink && <QRCodeCanvas value={qrLink} size={400} level='H' />}
            </div>
            <div className='scan-label text-center'>SCAN ME</div>
          </div>

          <div className='text-center'>
            <p className='mt-4'>
              Vui lòng chờ trong{" "}
              <span className='text-red-700 font-bold'>{timeRemaining}</span>{" "}
              giây để chúng tôi xác nhận thanh toán.
            </p>
            <p className='mt-4 italic'>
              Lưu ý: Nếu người dùng thanh toán nhưng xác thực thất bại, vui lòng
              đến <br />
              quầy thu ngân để được hỗ trợ kịp thời
            </p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <ButtonFooter next={"/print-patient-check-up"} prev={"/check-up"} />
      </div>
    </div>
  );
}
