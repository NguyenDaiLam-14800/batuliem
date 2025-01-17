"use client";

import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { usePatientContext } from "@/app/PatientProvider";
import Image from "next/image";

const SearchPay = () => {
  const { patientInfo } = usePatientContext();

  const dataInfo = patientInfo.personalInfo?.data;

  return (
    <div className='h-full'>
      <div className='relative isolate overflow-auto bg-white px-10 py-20 text-center sm:px-16 sm:shadow-sm h-full'>
        <p className='mx-auto max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Bạn đang muốn tìm kiếm dịch vụ thanh toán ?
        </p>
        {/*  */}
        <div className='bg-white flex flex-col flex-grow justify-around gap-1 text-base shadow-xl p-2 md:p-6 tall:text-3xl w-full overflow-auto'>
          {patientInfo.faceImage && (
            <Image
              width={400}
              height={400}
              src={patientInfo.faceImage.data.img_data}
              alt=''
              className='self-center'
            />
          )}
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Số căn cước:</span>
            <span>{dataInfo?.idCode || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Họ và tên:</span>
            <span>{dataInfo?.personName || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Ngày sinh:</span>
            <span>{dataInfo?.dateOfBirth || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Giới tính:</span>
            <span>{dataInfo?.gender || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Quốc tịch:</span>
            <span>{dataInfo?.nationality || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Nguyên quán:</span>
            <span>{dataInfo?.originPlace || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Ngày cấp:</span>
            <span>{dataInfo?.issueDate || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Ngày hết hạn:</span>
            <span>{dataInfo?.expiryDate || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Dân tộc:</span>
            <span>{dataInfo?.race || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Tôn giáo:</span>
            <span>{dataInfo?.religion || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Nhận dạng cá nhân:</span>
            <span>{dataInfo?.personalIdentification || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Thường trú:</span>
            <span>{dataInfo?.residencePlace || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Họ tên cha, mẹ:</span>
            <span>
              {dataInfo?.fatherName || "N/A"}, {dataInfo?.motherName || "N/A"}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Họ tên vợ, chồng:</span>
            <span>{dataInfo?.wifeName || "N/A"}</span>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <span>Số CCCD cũ:</span>
            <span>{dataInfo?.oldIdCode || "N/A"}</span>
          </div>
        </div>
        {/*  */}
        <form action='/search'>
          <label
            className='mx-auto mt-8 relative bg-white min-w-sm flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300'
            htmlFor='search-bar'
          >
            <input
              id='search-bar'
              placeholder='Nhập từ khóa để tìm kiếm'
              name='q'
              className='px-6 py-2 w-full rounded-md flex-1 outline-none bg-white'
              required
            />
            <button
              type='submit'
              className='w-full md:w-auto px-6 py-3 bg-[var(--niad-color)] border-[var(--niad-color)] text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all'
            >
              <div className='flex items-center transition-all opacity-1'>
                <span className='text-sm font-semibold whitespace-nowrap truncate mx-auto'>
                  Tìm kiếm
                </span>
              </div>
            </button>
          </label>
        </form>

        <div className='relative overflow-x-auto shadow-lg sm:rounded-lg mt-16'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr className='text-center'>
                <th scope='col' className='px-6 py-3'>
                  Tên dịch vụ
                </th>
                <th scope='col' className='px-6 py-3'>
                  Đơn vị
                </th>
                <th scope='col' className='px-6 py-3'>
                  Giá BHYT
                </th>
                <th scope='col' className='px-6 py-3'>
                  Giá viện phí
                </th>
                <th scope='col' className='px-6 py-3'>
                  Giá yêu cầu
                </th>
                <th scope='col' className='px-6 py-3'>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Khám Nội
                </th>
                <td className='px-6 py-4 text-center'>Lần</td>
                <td className='px-6 py-4 text-center'>18,700</td>
                <td className='px-6 py-4 text-center'>0</td>
                <td className='px-6 py-4 text-center'>250,000</td>
                <td className='px-6 py-4 text-center'>
                  <span className='px-6 py-2 bg-green-200 text-green-500 rounded-xl'>
                    Đã thanh toán
                  </span>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Khám Phụ Sản
                </th>
                <td className='px-6 py-4 text-center'>Lần</td>
                <td className='px-6 py-4 text-center'>37,000</td>
                <td className='px-6 py-4 text-center'>0</td>
                <td className='px-6 py-4 text-center'>250,000</td>
                <td className='px-6 py-4 text-center'>
                  <span className='px-6 py-2 bg-red-200 text-red-500 rounded-xl'>
                    Chưa thanh toán
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href={"/patient-identification-search"}
          className='bg-white rounded-full px-12 py-4 shadow-lg fixed bottom-8 left-8 flex'
        >
          <KeyboardBackspaceIcon /> Trở lại
        </Link>
      </div>
    </div>
  );
};

export default SearchPay;
