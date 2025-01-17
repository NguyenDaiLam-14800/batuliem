'use client'
import { QRCodeCanvas } from 'qrcode.react';
import React, { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
    onClose: () => void;
    children?: ReactNode;
    qrLink: string;
}
export const Payment: React.FC<ModalProps> = ({ qrLink }) => {

    const [timeRemaining, setTimeRemaining] = useState(120);
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);
    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);
    return (
        <div
            className="inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto modal-content relative">
                <div className="p-6">
                    <h2 className="text-xl text-center font-semibold mb-4">Quét Mã QR để Thanh Toán</h2>

                    <div className="qr-container mt-12">
                        <div className="qr-border flex justify-center mb-4">
                            <QRCodeCanvas value={qrLink} size={256} level="H" />
                        </div>
                        <div className="scan-label text-center">SCAN ME</div>
                    </div>

                    <div className='text-center'>
                        <p className='mt-4'>
                            Vui lòng chờ trong <span className='text-red-700 font-bold'>{timeRemaining}</span> giây để chúng tôi xác nhận thanh toán.
                        </p>
                        <p className='mt-4 italic'>
                            Lưu ý: Nếu người dùng thanh toán nhưng xác thực thất bại, vui lòng đến <br />quầy thu ngân để được hỗ trợ kịp thời
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
