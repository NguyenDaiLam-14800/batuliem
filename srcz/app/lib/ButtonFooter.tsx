'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function ButtonFooter(props: {
  next?: string;
  prev?: string;
  isNextLoading?: boolean;
  nextOnclick?: () => void;
  prevOnclick?: () => void;
  timeOut?: number;
}) {
  const { next, prev, isNextLoading, nextOnclick, prevOnclick, timeOut } = props;
  const [timeRest, setTimeRest] = useState<number>(timeOut || 0);
  const router = useRouter()

  useEffect(() => {
    if (!(next || timeOut)) return;

    const reverse = setInterval(() => {
      setTimeRest((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(reverse);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(reverse);
  }, [next, timeOut]);

  useEffect(() => {
    if (timeOut && next && timeRest <= 0) {
      router.push(next);
    }
  }, [timeRest, next, router]);

  return (
    <div className=' flex gap-1 mt-2'>
      {prev && !prevOnclick && (
        <Link
          href={prev}
          className={`bg-[#16817b] gap-3 font-bold text-white px-2 py-4 ${next || nextOnclick || isNextLoading ? "rounded-bl-lg w-1/2" : "rounded-b-lg w-full"
            } text-center text-xs sm:text-sm active:bg-[#16817b]/80`}
        >
          Trở lại
        </Link>
      )}
      {next && !isNextLoading && !nextOnclick && (
        <Link
          href={next}
          className={`bg-[#16817b] gap-3 font-bold text-white px-2 py-4 ${prev || prevOnclick ? "rounded-br-lg  w-1/2" : "rounded-b-lg w-full"
            } text-center text-xs sm:text-sm active:bg-[#16817b]/80 flex justify-center`}
        >
          Bước tiếp theo <KeyboardDoubleArrowRightIcon />{timeOut && `(${timeRest})`}
        </Link>
      )}
      {!prev && prevOnclick && (
        <div
          onClick={prevOnclick}
          className={`bg-[#16817b] gap-3 font-bold text-white px-2 py-4 ${next ? "rounded-bl-lg w-1/2" : "rounded-b-lg w-full"
            } text-center text-xs sm:text-sm active:bg-[#16817b]/80`}
        >
          Trở lại
        </div>
      )}
      {!next && !isNextLoading && nextOnclick && (
        <div
          onClick={nextOnclick}
          className={`bg-[#16817b] gap-3 font-bold text-white px-2 py-4 ${prev ? "rounded-br-lg  w-1/2" : "rounded-b-lg w-full"
            } text-center text-xs sm:text-sm active:bg-[#16817b]/80  flex justify-center`}
        >
          Bước tiếp theo <KeyboardDoubleArrowRightIcon />
        </div>
      )}
      {isNextLoading && !nextOnclick && (
        <div
          className={`bg-[#16817b]/60 gap-3 font-bold text-white px-2 py-4 flex justify-center ${prev ? "rounded-br-lg  w-1/2" : "rounded-b-lg w-full"
            } text-center text-xs sm:text-sm active:bg-[#16817b]/80  flex justify-center`}
        >
          Bước tiếp theo
          <KeyboardDoubleArrowRightIcon />
          <div role='status' aria-label='loading'>
            <svg
              className='w-6 h-6 stroke-gray-600 animate-spin '
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_9023_61563)'>
                <path
                  d='M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444'
                  stroke='stroke-current'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  className='my-path'
                ></path>
              </g>
              <defs>
                <clipPath id='clip0_9023_61563'>
                  <rect width='24' height='24' fill='white'></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
