'use client'
import Image from 'next/image';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSearchParams } from 'next/navigation';
import { listShop } from '@/app/utils/shopBTL';
import { listProduct } from '@/app/utils/products';
import { Suspense } from 'react';

export default function ShopDetailPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const shop = listShop.find((item) => String(item.shopID) === id);

    if (!shop) {
        return <div>Không tìm thấy thông tin cửa hàng</div>;
    }

    const products = listProduct.filter(product => product.idShop === Number(shop.shopID));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="relative w-[1920px] h-[1080px] bg-[url('/backgruond.svg')] flex justify-center items-center">
                {/* Container chính */}
                <div className="p-5 w-[95%] h-[95%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Phần thông tin cửa hàng */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cột trái - Logo và thông tin */}
                        <div className="p-6">
                            <div className="relative h-[300px] mb-6 bg-gray-50 rounded-lg">
                                <Image
                                    src={shop.shopLogo ? `/image/imgLogo/${shop.shopLogo}` : '/image/default.png'}
                                    alt={shop.shopName}
                                    fill
                                    className="object-contain p-4"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <h1 className="text-3xl font-bold mb-6 uppercase text-center">{shop.shopName}</h1>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex items-center gap-3">
                                    <LocationOnIcon className="text-red-600" />
                                    <span>Địa chỉ: {shop.shopAdress}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="text-green-600" />
                                    <span>Số điện thoại: {shop.shopPhone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StoreIcon className="text-blue-600" />
                                    <span>Khu vực: {shop.shopKV}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <InfoIcon className="text-purple-600" />
                                    <span>SPTB: {shop.shopKey}</span>
                                </div>
                            </div>
                            {/* Thông tin thêm */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold mb-2">Thông tin thêm:</h3>
                                <div className="h-[300px] w-[100%] overflow-y-scroll scrollbar-hide">
                                    <p className="text-gray-600 text-justify">
                                        {shop.shopInfo?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        )) || 'Chưa có thông tin'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cột phải - Danh sách sản phẩm */}
                        <div className="bg-gray-50 p-6 relative">
                            <h2 className="text-2xl font-bold mb-6">SẢN PHẨM TRƯNG BÀY:</h2>
                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[700px] text-center">
                                    {products.map((product) => (
                                        <div key={product.idproduct} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="relative h-[200px]">
                                                <Image
                                                    src={product.imageProduct ? `/image/product/${product.imageProduct}` : 'abc'}
                                                    alt={product.nameProduct}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800 mb-2">{product.nameProduct}</h3>
                                                <p className="text-red-600 font-medium">
                                                    {product.price ? `${product.price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg">
                                    <Image
                                        src="/nobox.svg"
                                        alt="No products"
                                        width={150}
                                        height={150}
                                        className="mb-10 opacity-50"
                                    />
                                    <p className="text-gray-500 text-xl">Chưa có sản phẩm nào</p>
                                </div>
                            )}
                            {/* Header với nút quay lại */}
                            <div className="max-w-7xl mx-auto mb-6 absolute bottom-0 right-9">
                                <Link href="/shops" className="inline-flex items-center text-gray-600 hover:text-gray-800">
                                    <ArrowBackIcon className="mr-2" />
                                    <span>Quay lại danh sách cửa hàng</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}