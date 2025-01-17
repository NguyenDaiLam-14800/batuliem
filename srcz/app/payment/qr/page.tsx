"use client";

import React, { useEffect, useState } from "react";
import { VietQR } from "@/app/pay/vietQR";
import { QRCodeCanvas } from "qrcode.react";
import ButtonFooter from "@/app/lib/ButtonFooter";
import { useParams } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

export default function PayQr() {
  const [qrLink, setQrLink] = useState<string | null>();
  const [prevUrl, setPrevUrl] = useState<string>("")
  const handleGenarateQr = (amount: string) => {
    const dataQR = {
      bankId: '970418',
      accountNumber: '42710000478032',
      amount: amount,
      description: 'chuyen khoan',
    };
    const vietQR = new VietQR();
    vietQR
      .setBeneficiaryOrganization(dataQR.bankId, dataQR.accountNumber)
      .setTransactionAmount(dataQR.amount)
      .setAdditionalDataFieldTemplate(dataQR.description);

    const qrLinkGenerated = vietQR.build();
    setQrLink(qrLinkGenerated);
  };

  useEffect(() => {
    const amount = useQuery().get("amount")
    setPrevUrl(useQuery().get("prev") || "/payment")
    console.log(useQuery().get("prev"))
    if (amount) handleGenarateQr(amount);
  }, []);

  return (
    <div className='flex flex-col items-center justify-between h-full p-[3%]'>
      <h1 className='text-center font-bold text-3xl tall:text-4xl'>
        Thanh toán
      </h1>
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
            <p className='mt-4 italic'>
              Lưu ý: Nếu thanh toán nhưng xác thực thất bại, vui lòng đến <br />
              quầy thu ngân để được hỗ trợ kịp thời
            </p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <ButtonFooter next={"/payment"} prev={prevUrl} timeOut={120} />
      </div>
    </div>
  );
}
