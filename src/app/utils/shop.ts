// Định nghĩa kiểu dữ liệu cho Shop dựa theo cấu trúc bảng shopBTL trong database
export interface Shop {
    shopID: number;
    shopName: string;
    shopLogo: string;
    shopAdress: string;
    shopPhone: string;
    shopKV: string;
    shopKey: string;
    shopInfo: string;
    shopLink: string;
}

// Định nghĩa kiểu dữ liệu cho Product dựa theo cấu trúc bảng products trong database
export interface Product {
    idproduct: number;
    nameProduct: string;
    imageProduct: string;
    price: number;
    idShop: number;
}