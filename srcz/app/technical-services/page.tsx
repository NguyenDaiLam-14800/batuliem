import React from 'react'
import ButtonFooter from '../lib/ButtonFooter'

const technicalServicesPage = () => {
  return (
    <div className="bg-gray-100 p-[3%] h-full">
      <div className="w-full bg-white p-4 rounded-md shadow-md flex flex-col h-full">
        <div className="max-w-4xl mx-auto text-center p-2 rounded-t-md">
          <h2 className="font-semibold">DANH SÁCH DỊCH VỤ</h2>
        </div>

        <div className="flex space-x-4 mb-4 ">
          <input type="text" placeholder="Mã dịch vụ" className="border border-gray-300 rounded-md p-2 w-1/2" />
          <input type="text" placeholder="Tên dịch vụ" className="border border-gray-300 rounded-md p-2 w-1/2" />
          <button className="bg-teal-700 text-white px-4 py-2 rounded-md flex-shrink-0">Tìm kiếm</button>
        </div>
        <div className="flex-grow">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">STT</th>
                  <th className="border p-2">Mã dịch vụ</th>
                  <th className="border p-2">Tên dịch vụ</th>
                  <th className="border p-2">Đơn vị</th>
                  <th className="border p-2">Giá BHYT</th>
                  <th className="border p-2">Giá viện phí</th>
                  <th className="border p-2">Giá yêu cầu</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border p-2">1</td>
                  <td className="border p-2">KN</td>
                  <td className="border p-2">Khám Nội</td>
                  <td className="border p-2">Lần</td>
                  <td className="border p-2">18,700</td>
                  <td className="border p-2">0</td>
                  <td className="border p-2">250,000</td>
                </tr>
                <tr>
                  <td className="border p-2">2</td>
                  <td className="border p-2">KPs</td>
                  <td className="border p-2">Khám Phụ Sản</td>
                  <td className="border p-2">Lần</td>
                  <td className="border p-2">37,000</td>
                  <td className="border p-2">0</td>
                  <td className="border p-2">250,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">1 đến 10 / 36</div>
            <div className="flex space-x-2">
              <button className="border border-gray-300 px-2 py-1">«</button>
              <button className="border border-gray-300 px-2 py-1">1</button>
              <button className="border border-gray-300 px-2 py-1">2</button>
              <button className="border border-gray-300 px-2 py-1">3</button>
              <button className="border border-gray-300 px-2 py-1">»</button>
            </div>

          </div>
        </div>
        <ButtonFooter prev={"/"} />
      </div>

    </div>
  )
}

export default technicalServicesPage