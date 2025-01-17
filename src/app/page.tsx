'use client';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Link from "next/link";

export default function Home() {
  const scrollToLam = () => {
    const element = document.getElementById("lam");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // overflow-hidden
  return (
    <div className=" bg-slate-500 relative ">
      <div className='bg-logo h-[1080px] w-[1920px] '>
      </div>
      <div id="lam" className="relative w-[1920px] h-[1080px] bg-cover bg-center bg-[url('/backgruond.svg')]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-[40px] w-[95%] rounded-lg shadow-lg p-5 " style={{ backgroundColor: 'rgb(255 255 255 / 0.8)' }}>
            <div className="flex bg-white" style={{ borderRadius: '5px' }}>
              {/* Cột trái - Nội dung */}
              <div className="w-1/2 p-8">
                <div>
                  <p className="text-[30px] text-[#ea2726] font-bold ">HỘI CHỢ TẾT CHÀO XUÂN ẤT TỴ 2025</p>
                  <p style={{ lineHeight: '50px' }} className=" mb-6 text-[40px] font-bold">TRƯNG BÀY GIỚI THIỆU SẢN PHẨM ĐỊNH HƯỚNG <span className="text-[#ea2726]">CHUYỂN ĐỔI SỐ</span></p>
                </div>
                <div className="text-[23px] text-justify " style={{ lineHeight: '40px' }}>
                  <p className="" style={{ fontStyle: 'italic' }}>
                    Chào mừng bạn đến: CHƯƠNG TRÌNH HỘI CHỢ TẾT CHÀO XUÂN ẤT TỴ 2025 TRƯNG BÀY GIỚI THIỆU SẢN PHẨM ĐỊNH HƯỚNG CHUYỂN ĐỔI SỐ.
                  </p>
                  <p className="font-bold"> Thời gian:<span className="font-thin"> Từ 17/1/2025 - đến 21/01/2025. </span></p>
                  <p className="font-bold"> Địa điểm: <span className="font-thin"> Công viên Hòa Bình, Hà Nội. </span></p>
                  <p className="font-bold"> Chủ đề:   <span className="font-thin">   "Công nghệ số - Nâng tầm cuộc sống". </span></p>
                  <p> HỘI NGHỊ, XÚC TIẾN THƯƠNG MẠI SẢN PHẨM ĐỊNH HƯỚNG CHUYỂN ĐỔI SỐ là sự kiện đặc biệt hướng đến tương lai, nơi hội tụ những sản phẩm, dịch vụ và
                    giải pháp công nghệ chuyển đổi số hàng đầu. Sự kiện không chỉ mang đến những trải nghiệm mới lạ mà còn góp phần kết nối doanh nghiệp
                    và người dân, hướng tới một cuộc sống thông minh, bình ổn giá và tiện lợi.</p>
                </div>
              </div>
              {/* Cột phải - Hình ảnh */}
              <div className="w-1/2 h-full " >
                <div className="h-full w-full " style={{ border: '5px solid #ea2726' }}>
                  <img src="/map.svg" alt="map" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/map"}
        className='fixed bottom-[50px] right-[50px] shadow-xl w-[300px] h-[70px] flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'>
        <div> <span className='text-center'>Bản đồ</span></div>
      </Link>

      <Link href={"#lam"}
        onClick={scrollToLam}
        className='fixed bottom-[50px] right-[400px] shadow-xl w-[300px] h-[70px] flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'>
        <div><span className='text-center'>Thông tin</span></div>
      </Link>
    </div>

  );
}