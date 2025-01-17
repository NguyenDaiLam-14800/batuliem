import Database from 'better-sqlite3';
import path from 'path';
import { Shop, Product } from './shop';

// Khởi tạo kết nối database
const db = new Database(path.join(process.cwd(), 'src/data/shops.db'));

/**
 * Lấy tất cả các shop
 */
export function getShops(): Shop[] {
    try {
        const shops = db.prepare('SELECT * FROM shopBTL').all();
        return shops as Shop[];
    } catch (error) {
        console.error('Lỗi khi lấy danh sách shops:', error);
        return [];
    }
}

/**
 * Lấy shop theo ID
 */
export function getShopById(id: Number): Shop | null {
    try {
        const shop = db.prepare('SELECT * FROM shopBTL WHERE shopID = ?').get(id);
        return shop as Shop || null;
    } catch (error) {
        console.error(`Lỗi khi lấy shop với ID ${id}:`, error);
        return null;
    }
}



/**
 * Lấy sản phẩm theo shop ID
 */
export function getProductsByShopId(shopId: number): Product[] {
    try {
        const products = db.prepare('SELECT * FROM products WHERE idShop = ?').all(shopId);
        return products as Product[];
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm của shop ${shopId}:`, error);
        return [];
    }
}

// Đóng kết nối database khi ứng dụng kết thúc
process.on('exit', () => {
    db.close();
});