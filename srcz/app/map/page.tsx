import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonFooter from "../lib/ButtonFooter";

const page = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-center items-center h-full overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">
        BẢN ĐỒ BỆNH VIỆN ĐA KHOA VNPT
      </h1>

      <div className="flex-shrink-0 flex-grow w-full">
        <Image
          src={'/image/map.jpg'}
          alt="Hospital Map"
          width={100}
          height={100}
          layout="responsive"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="w-full">
        <ButtonFooter prev={"/"} />
      </div>
    </div>
  );
};

export default page;
