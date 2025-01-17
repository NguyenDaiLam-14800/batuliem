import Link from "next/link";
import ButtonFooter from "../lib/ButtonFooter";

const Payment = () => {
    return (
        <div className="p-[3%] h-full">
            <div className='h-full flex flex-col'>
                <h2 className="text-center font-bold text-3xl tall:text-4xl py-5">
                    Thanh toán
                </h2>
                <div className="flex flex-col justify-start flex-grow gap-8 py-8">
                    <Link href={"/payment/service"} className="shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Dịch vụ</Link>
                    <Link href={"/payment/advance-payment"} className="shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Tạm ứng</Link>
                </div>
                <ButtonFooter prev={"/"} />
            </div>

        </div>
    );
}

export default Payment;