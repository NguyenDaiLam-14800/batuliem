import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonFooter from "../lib/ButtonFooter";
import { yellow } from "@mui/material/colors";

const Page = () => {
  return (
    <div className="relative w-[1920px] h-[1080px] bg-[url('/backgruond.svg')] flex justify-center items-center  ">
      <div className="h-[95vh] w-[95%] flex" >
        {/* map */}
        <div className="w-[1500px]">
          <div className="map h-[100%] m-l" style={{ border: '8px solid yellow' }}>
            <Link href="/shops?area=1" className="absolute top-[37%] left-[36%]">
              <button className="bg-green-900 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:scale-110">
                1
              </button>
            </Link>
            <Link href="/shops?area=2" className="absolute top-[55%] left-[20%]">
              <button className="bg-blue-700 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-110">
                2
              </button>
            </Link>
            <Link href="/shops?area=2" className="absolute top-[62%] right-[20%]">
              <button className="bg-blue-700 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-110">
                2
              </button>
            </Link>
            <Link href="/shops?area=3" className="absolute top-[42%] right-[20%]">
              <button className="bg-orange-600 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-110">
                3
              </button>
            </Link>
            <Link href="/shops?area=4" className="absolute top-[8%] left-[22%]">
              <button className="bg-cyan-600 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-110">
                4
              </button>
            </Link>
            <Link href="/shops?area=5" className="absolute top-[30%] left-[5%]">
              <button className="bg-rose-800 text-[30px] font-extrabold text-white w-[70px] h-[70px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-110">
                5
              </button>
            </Link>
          </div>
        </div>
        {/* sidebar */}
        <div className="w-[20%] h-full  flex-col flex items-center">
          <div className="" style={{ width: '180px', height: '180px', marginTop: '13%' }}>
            <Link href="/">
              <Image
                alt="logo"
                src="/logobtl.svg"
                width={200}
                height={200}
                className="block"
              />
            </Link>
            {/* <img src="/logobtl.svg" alt="logo" className="w-[100%]" /> */}
          </div>
          {/* btn */}
          <div className="flex flex-col gap-[20px] w-full h-full px-10" style={{ marginTop: '30px' }}>
            <Link href="/shops?area=1">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-green-900 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center">
                Khu công nghệ
              </button>
            </Link>
            <Link href="/shops?area=2">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-blue-700 hover:bg-blue-900 text-white rounded-lg transition-colors duration-200 text-center">
                Khu gian hàng tiêu chuẩn
              </button>
            </Link>
            <Link href="/shops?area=3">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-orange-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center">
                Khu cây cảnh và hoa
              </button>
            </Link>
            <Link href="/shops?area=4">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-cyan-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center">
                Khu OCOP và đặc sản Bắc Từ Liêm
              </button>
            </Link>
            <Link href="/shops?area=5">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-rose-800 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center">
                Khu ẩm thực
              </button>
            </Link>
            <Link href="/">
              <button className="w-full m-0 h-[100px] font-bold shadow-xl text-xl bg-red-900 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center">
                Trang chủ
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* item */}
      <div className="absolute w-[400px]" style={{ bottom: '0', left: '0' }} >
        <img src="/4.svg" alt="zz" className="w-[100%]" />
      </div>
      <div className="absolute w-[350px]" style={{ top: '-60px', left: '-30px' }}  >
        <img src="/1.svg" alt="zz" className="w-[100%]" />
      </div>
      <div className="absolute w-[350px]" style={{ top: '-180px', right: '-30px' }}  >
        <img src="/2.svg" alt="zz" className="w-[100%]" />
      </div>
    </div>
  );
};

export default Page;