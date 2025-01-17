"use client"
import ButtonFooter from "@/app/lib/ButtonFooter";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_ADVANCE = [
    1000000,
    2000000,
    5000000,
    10000000
]

const AdvancePayment = () => {
    const [advanceMoney, setAdvanceMoney] = useState<number>(0)

    return (
        <div className="p-[3%] h-full">
            <div className='h-full flex flex-col'>
                <h2 className="text-center font-bold text-3xl tall:text-4xl py-5">
                    Chọn số tiền bạn muốn tạm ứng
                </h2>
                {!!advanceMoney && <p className="text-center">Số tiền muốn tạm ứng: <b>{formatCurrency(advanceMoney)}</b> </p>}
                <div className="flex flex-col justify-start flex-grow gap-8 py-8">
                    {DEFAULT_ADVANCE.map((item, index) =>
                        <button key={index} onClick={() => setAdvanceMoney(item)} className="shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">{formatCurrency(item)}</button>
                    )}
                    <Link href={"/payment/advance-payment/other-option"} className="shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Số tiền khác</Link>
                </div>
                <ButtonFooter prev={"/payment"} next={advanceMoney ? `/payment/qr?amount=${advanceMoney}&prev=/payment/advance-payment` : ""} />
            </div>

        </div>
    );
}

export default AdvancePayment;