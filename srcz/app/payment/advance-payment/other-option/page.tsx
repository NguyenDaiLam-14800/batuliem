"use client"
import NumberKeyBoard from "@/app/components/NumberKeyboard";
import ButtonFooter from "@/app/lib/ButtonFooter";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

const OtherOption = () => {
    const [advanceMoney, setAdvanceMoney] = useState<string>("")

    return (
        <div className="p-[3%] h-full">
            <div className='h-full flex flex-col'>
                <h2 className="text-center font-bold text-3xl tall:text-4xl py-5">
                    Chọn số tiền bạn muốn tạm ứng
                </h2>
                {!!advanceMoney && <p className="text-center tall:text-3xl"><b>{formatCurrency(Number(advanceMoney))}</b> </p>}
                <div className="flex flex-col justify-start flex-grow gap-8 py-8">
                    <NumberKeyBoard
                        advanceMoney={advanceMoney}
                        setAdvanceMoney={setAdvanceMoney}
                    />
                </div>
                <ButtonFooter prev={"/payment/advance-payment"} next={advanceMoney ? `/payment/qr?amount=${advanceMoney}&prev=/payment/advance-payment/other-option` : ""} />
            </div>

        </div>
    );
}

export default OtherOption;