import ButtonFooter from "../lib/ButtonFooter";

const Queue = () => {
    return (
        <div className="p-[3%] h-full flex flex-col">
            <h1 className="text-center font-bold text-3xl tall:text-4xl py-5">Lấy số tự động</h1>
            <div className="grid grid-cols-2 flex-grow gap-8 p-8">
                <div className="col-span-1 shadow-xl flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Bệnh nhân BHYT</div>
                <div className="col-span-1 shadow-xl flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Bệnh nhân dịch vụ</div>
                <div className="col-span-1 shadow-xl flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Bệnh nhân Ưu tiên</div>
                <div className="col-span-1 shadow-xl flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">Thanh toán</div>
            </div>
            <ButtonFooter prev={"/"} />
        </div>
    );
}

export default Queue;