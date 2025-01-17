import Link from "next/link";
import React from "react";
const treatmentHistoryPage = () => {
  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Lịch sử khám chữa bệnh
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Mã bệnh nhân*</label>
            <input
              type="text"
              defaultValue="BN001213"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mã bệnh án*</label>
            <input
              type="text"
              defaultValue="BA2301170100"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">
              Ngày tháng năm sinh*
            </label>
            <input
              type="text"
              defaultValue="11/07/2002"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Họ và tên*</label>
            <input
              type="text"
              defaultValue="Phạm Thị Huyền Trang"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">CCCD*</label>
            <input
              type="text"
              defaultValue="034302001987"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Số thẻ BHYT*</label>
            <input
              type="text"
              defaultValue="034302001987"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Địa chỉ BHYT*</label>
            <input
              type="text"
              defaultValue="Bệnh viện Bưu điện"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Ngày khám*</label>
            <input
              type="text"
              defaultValue="21/12/2023"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Thông tin khám:</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 h-24"
              defaultValue="Phòng: 203 - Phòng khám nội tiết Bác sĩ khám: Nguyễn Văn A Chẩn đoán chính: Chẩn đoán phụ: Xử trí:"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Thông tin CLS:</label>
            <textarea className="w-full border border-gray-300 rounded-lg p-2 h-24"></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Thông tin thuốc:</label>
            <textarea className="w-full border border-gray-300 rounded-lg p-2 h-24"></textarea>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <Link href={"/"} className="bg-blue-500 text-white px-4 py-2 rounded-md">Quay lại màn hình chính</Link>

      </div>
    </div>
  );
};

export default treatmentHistoryPage;
