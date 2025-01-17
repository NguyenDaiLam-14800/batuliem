import ButtonFooter from "@/app/lib/ButtonFooter";
import Link from "next/link";

function Search() {
  return (
    <div className='p-[3%] h-full'>
      <div className='h-full flex flex-col'>
        <h2 className='text-center font-bold text-3xl tall:text-4xl py-5'>
          Tra cứu
        </h2>
        <div className='flex flex-col justify-start flex-grow gap-8 py-8'>
          <Link
            href={"/patient-identification-search"}
            className='shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
          >
            Thông tin thanh toán
          </Link>
          <Link
            href={"/search/service"}
            className='shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
          >
            Thông tin dịch vụ
          </Link>
        </div>
        <ButtonFooter prev={"/"} />
      </div>
    </div>
  );
}

export default Search;
