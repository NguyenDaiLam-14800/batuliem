"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_serve_1 = __importDefault(require("electron-serve"));
const loadURL = electron_1.app.isPackaged
    ? (0, electron_serve_1.default)({
        directory: path_1.default.join(__dirname, "../out"),
    })
    : null;
(async () => {
    // let tray = null;
    const appFolder = path_1.default.dirname(process.execPath);
    const appExePath = path_1.default.join(appFolder, 'build/win-unpacked/KioskApp.exe');
    electron_1.app.setLoginItemSettings({
        openAtLogin: true,
        path: appExePath,
        args: ['--hidden']
    });
    async function createWindow() {
        const win = new electron_1.BrowserWindow({
            width: 1080,
            height: 1920,
            fullscreen: true, // Kích hoạt toàn màn hình
            frame: false, // Ẩn thanh công cụ
            icon: path_1.default.join(__dirname, 'public/image/app-icon.ico'),
            webPreferences: {
                preload: path_1.default.join(__dirname, "preload.js"), // Preload nếu cần
                nodeIntegration: true, // Bảo mật: Tắt truy cập trực tiếp vào Node.js
                allowRunningInsecureContent: true,
            },
        });
        if (electron_1.app.isPackaged && loadURL) {
            await loadURL(win);
            await win.loadURL("app://-");
        }
        else {
            win.loadURL("http://localhost:3000");
            win.webContents.openDevTools();
        }
        electron_1.ipcMain.on("before-print", (event) => {
            win.webContents.print({ silent: true });
            event.preventDefault(); // Ngăn chặn hành động in mặc định
        });
        // Lắng nghe sự kiện 'print-content' từ renderer process
        electron_1.ipcMain.on("print-content", (event, content) => {
            // Tạo một cửa sổ mới để in, cửa sổ này sẽ không hiển thị
            const printWindow = new electron_1.BrowserWindow({ show: false });
            printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(content)}`);
            // Khi cửa sổ in tải xong, thực hiện lệnh in
            printWindow.webContents.on("did-finish-load", async () => {
                const printers = await printWindow.webContents.getPrintersAsync();
                // Tìm máy in mặc định
                const defaultPrinter = printers.find((printer) => printer.isDefault);
                const deviceName = defaultPrinter ? defaultPrinter.name : ""; // Lấy tên máy in mặc định
                printWindow.webContents.print({
                    margins: { marginType: "none" },
                    silent: true, // In mà không yêu cầu xác nhận
                    printBackground: true, // In nền của trang (background)
                    deviceName: deviceName,
                }, (success, errorType) => {
                    if (!success) {
                        console.error("In thất bại:", errorType);
                    }
                    printWindow.close(); // Đóng cửa sổ in sau khi in xong
                });
            });
        });
    }
    // Khi ứng dụng đã sẵn sàng
    await electron_1.app.whenReady().then(createWindow);
    // Khi tất cả cửa sổ bị đóng
    electron_1.app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    electron_1.ipcMain.on('close-app', () => {
        electron_1.app.quit();
    });
    // Khi ứng dụng được kích hoạt lại (dành cho macOS)
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})();
