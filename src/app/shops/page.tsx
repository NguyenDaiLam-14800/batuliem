'use client';

import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { listShop } from '@/app/utils/shopBTL';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

const arenas = [
    { value: "", label: "Tất cả khu vực" },
    { value: "1", label: "Khu công nghệ" },
    { value: "2", label: "Gian hàng tiêu chuẩn" },
    { value: "3", label: "Khu cây cảnh và hoa" },
    { value: "4", label: "Khu OCOP và đặc sản Bắc Từ Liêm" },
    { value: "5", label: "Khu ẩm thực" },
];

const CustomSelect = ({ onSelect }: { onSelect: (value: string) => void }) => {
    const [selectedArena, setSelectedArena] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        setSelectedArena(value);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <div className="relative inline-block w-[400px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left px-4 py-2 border border-gray-300 rounded-lg 
                            ${isOpen ? 'bg-gray-200' : 'bg-white'} 
                            text-gray-700 focus:ring-2 focus:ring-[#006b66] transition duration-200 
                            hover:bg-gray-100`}
            >
                {arenas.find((a) => a.value === selectedArena)?.label || "Chọn khu vực"}
            </button>

            {isOpen && (
                <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
                    {arenas.map((arena) => (
                        <li
                            key={arena.value}
                            onClick={() => handleSelect(arena.value)}
                            className="px-6 py-2 cursor-pointer hover:bg-gray-200 transition"
                        >
                            {arena.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function ShopsPage() {
    const [selectedArena, setSelectedArena] = useState('');
    const searchParams = useSearchParams();
    const arena = searchParams.get("area");

    // Hàm chuyển đổi arena sang tên khu vực để hiển thị
    const getAreaDisplayName = (arena: string) => {
        switch (arena) {
            case "1":
                return "Khu công nghệ";
            case "2":
                return "Gian hàng tiêu chuẩn";
            case "3":
                return "Khu cây cảnh và hoa";
            case "4":
                return "KHU OCOP VÀ ĐẶC SẢN BẮC TỪ LIÊM";
            case "5":
                return "KHU ẨM THỰC";
            default:
                return "";
        }
    };

    // Cập nhật selectedArena khi arena từ URL thay đổi
    useEffect(() => {
        if (arena) {
            setSelectedArena(arena);
        }
    }, [arena]);

    // // Lọc shops theo arena
    // const filteredShops = selectedArena === ""  // Nếu chọn "Tất cả"
    //     ? listShop  // Hiển thị tất cả shops
    //     : selectedArena  // Nếu có chọn khu vực
    //         ? listShop.filter(shop => shop.arena === selectedArena)  // Lọc theo arena đã chọn
    //         : arena  // Nếu có tham số area từ URL
    //             ? listShop.filter(shop => shop.arena === arena)  // Lọc theo arena từ URL
    //             : listShop;  // Mặc định hiển thị tất cả

    const filteredShops = useMemo(() => {
        return listShop
            .filter(shop => !selectedArena || (shop.arena && shop.arena === selectedArena))
            .sort((a, b) => {
                const mapA = parseInt(a.shopMap);
                const mapB = parseInt(b.shopMap);
                return mapA - mapB;
            });
    }, [selectedArena]);
    const truncateText = (text: string | undefined, maxWords: number): string => {
        if (!text) return "Chưa có thông tin";
        const words = text.split(" ");
        return words.length > maxWords
            ? words.slice(0, maxWords).join(" ") + "..."
            : text;
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-[1920px] h-[1080px] bg-cover bg-center bg-[url('/backgruond.svg')]">
                <div className="w-full h-screen flex justify-center items-center p-b-[30px]">
                    <div className="w-[95%] h-[95%] bg-white/80 rounded-lg p-5 overflow-hidden" style={{ paddingBottom: '100px' }}>
                        <div className="pb-[10px] flex justify-between items-center">
                            <div>
                                <p className="ml-6 text-3xl font-semibold uppercase">
                                    {selectedArena ? getAreaDisplayName(selectedArena) : "TẤT CẢ GIAN HÀNG"}
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="pr-4">
                                    <CustomSelect onSelect={setSelectedArena} />
                                </div>
                                <div>
                                    <Link href="/map" className='text-center shadow-xl h-[70px] flex px-[20px] items-center justify-center tall:text-2xl bg-[#ffffff] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'>
                                        <div>
                                            <MapOutlinedIcon className='text-3xl tall:text-4xl' />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-4 ml-7">
                                {filteredShops.map((shop) => (
                                    <Link href={`/shop?id=${shop.shopID}`} key={`${shop.shopMap}-${shop.shopMap}`}>
                                        <div className="relative flex flex-col mb-[45px] bg-white shadow-sm border border-slate-200 rounded-lg w-[24rem] cursor-pointer">
                                            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                                <Image
                                                    src={shop.shopLogo ? `/image/imgLogo/${shop.shopLogo}` : '/image/default.png'}
                                                    alt={""}
                                                    width={500}
                                                    height={500}
                                                    className="w-full max-h-full object-contain p-4"
                                                    quality={100}
                                                    priority
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div style={{ display: 'inline-block' }}>
                                                    <div
                                                        className="uppercase mb-4 bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm text-center"
                                                        style={{
                                                            height: '30px',
                                                            lineHeight: '30px',
                                                            backgroundColor: shop.arena === "1" ? "#15803d" : // green-800
                                                                shop.arena === "2" ? "#1d4ed8" : // blue-700
                                                                    shop.arena === "3" ? "#ea580c" : // orange-600
                                                                        shop.arena === "4" ? "#0891b2" : // cyan-600
                                                                            shop.arena === "5" ? "#9f1239" : // rose-800
                                                                                "#64748b", // slate-500 (default)
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        <p style={{ margin: 0 }}>{getAreaDisplayName(shop.arena)}</p>
                                                    </div>
                                                </div>
                                                <h6 className="mb-2 text-slate-800 text-xl h-[60px] font-semibold">
                                                    <p className="uppercase">{shop.shopName}</p>
                                                </h6>
                                                {/* <div className="flex items-center gap-3">
                                                    <LocationOnIcon className="text-gray-600" />
                                                    <span>{truncateText(shop.shopAdress, 9)}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <PhoneIcon className="text-gray-600" />
                                                    <span>{truncateText(shop.shopPhone, 10)}</span>
                                                </div> */}

                                                <div className="flex items-center gap-3">
                                                    <StoreIcon className="text-gray-600" />
                                                    <span className="uppercase">{truncateText(shop.shopKey, 6)}</span>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-4 pt-0 mt-2 flex justify-end">
                                                <button
                                                    className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button"
                                                    style={{ backgroundColor: 'red' }}
                                                >
                                                    THÔNG TIN
                                                </button>
                                            </div>

                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}