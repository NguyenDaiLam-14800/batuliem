import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const SearchService = () => {
  return (
    <div className='h-full'>
      <div className='relative isolate overflow-hidden bg-white px-10 py-20 text-center sm:px-16 sm:shadow-sm h-full'>
        <p className='mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Bạn đang muốn tìm kiếm dịch vụ ?
        </p>
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
              <tr>
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
                <td className='px-6 py-4'>Lần</td>
                <td className='px-6 py-4'>18,700</td>
                <td className='px-6 py-4'>0</td>
                <td className='px-6 py-4'>250,000</td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Khám Phụ Sản
                </th>
                <td className='px-6 py-4'>Lần</td>
                <td className='px-6 py-4'>37,000</td>
                <td className='px-6 py-4'>0</td>
                <td className='px-6 py-4'>250,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href={"/search"}
          className='bg-white rounded-full px-12 py-4 shadow-lg fixed bottom-8 left-8 flex'
        >
          <KeyboardBackspaceIcon /> Trở lại
        </Link>
      </div>
    </div>
  );
};

export default SearchService;
