import EditNoteIcon from "@mui/icons-material/EditNote";
import PaymentIcon from "@mui/icons-material/Payment";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Link from "next/link";

export default function Home() {
  return (
    <div className='bg-logo h-full'>
      <div className='p-[5%] tall:p-[10%] flex flex-col h-full gap-2 tall:gap-8 bg-[#006b66]/60'>
        <h1 className='text-4xl tall:text-8xl text-center font-bold text-white text-shadow'>
          KIOSK
        </h1>
        <p className='text-xl tall:text-2xl text-center text-white'>
          Chào mừng bạn tới KIOSK phục vụ tự động, vui lòng chọn dịch vụ bạn
          muốn thực hiện!
        </p>
        <Link
          href={"/queue"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <ConfirmationNumberIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Lấy số</span>
        </Link>
        <Link
          href={"/form-medical-examination"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <EditNoteIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Đăng ký khám</span>
        </Link>
        <Link
          href={"https://mybic.vn/"}
          target='_blank'
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <HealthAndSafetyIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Đăng ký mở bảo hiểm</span>
        </Link>
        <Link
          href={"/payment"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <PaymentIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Thanh toán</span>
        </Link>
        <Link
          href={"https://bidv.com.vn/vn/trang-chu"}
          target='_blank'
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <AccountBalanceIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Ngân hàng số 24/7</span>
        </Link>
        <Link
          href={"/"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <AssignmentIndIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>
            Liên thông hồ sơ bệnh án (CCCD/VNEID)
          </span>
        </Link>
        <Link
          href={"/map"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <MapOutlinedIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Bản đồ</span>
        </Link>
        <Link
          href={"/search"}
          className='shadow-xl w-full h-full flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
        >
          <div>
            <SearchIcon className='text-3xl tall:text-6xl' />
          </div>
          <span className='text-center'>Tra cứu</span>
        </Link>
      </div>
    </div>
  );
}
