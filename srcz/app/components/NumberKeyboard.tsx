"use client"
import { Dispatch, SetStateAction, useRef } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
const NumberKeyBoard = ({ advanceMoney, setAdvanceMoney }: { advanceMoney: string, setAdvanceMoney: Dispatch<SetStateAction<string>> }) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const delayRef = useRef<number>(100);

    const executeWithDynamicSpeed = () => {
        handleBack();
        delayRef.current = Math.max(50, delayRef.current - 50);
        intervalRef.current = setTimeout(executeWithDynamicSpeed, delayRef.current);
    };

    const handleMouseDown = () => {
        delayRef.current = 500;
        executeWithDynamicSpeed();
    };

    const handleMouseUp = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    const handleChange = (value: string) => {
        setAdvanceMoney(advanceMoney + value)
    }

    const handleMultiple = () => {
        setAdvanceMoney(advanceMoney + "000")
    }

    const handleBack = () => {
        setAdvanceMoney((prev) => prev.slice(0, -1))
    }

    return (
        <div className="grid grid-cols-3 flex-grow gap-8 py-8">
            <button onClick={() => handleChange("1")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">1</button>
            <button onClick={() => handleChange("2")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">2</button>
            <button onClick={() => handleChange("3")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">3</button>
            <button onClick={() => handleChange("4")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">4</button>
            <button onClick={() => handleChange("5")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">5</button>
            <button onClick={() => handleChange("6")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">6</button>
            <button onClick={() => handleChange("7")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">7</button>
            <button onClick={() => handleChange("8")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">8</button>
            <button onClick={() => handleChange("9")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">9</button>
            <button onClick={handleMultiple} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">.000</button>
            <button onClick={() => handleChange("0")} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white">0</button>
            <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="col-span-1 shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white"><KeyboardReturnIcon /></button>
        </div>);
}

export default NumberKeyBoard;