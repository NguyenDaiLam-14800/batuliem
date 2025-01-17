import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import path from 'path';
import serve from 'electron-serve';

const loadURL = app.isPackaged
  ? serve({
    directory: path.join(__dirname, "../out"),
  })
  : null;

(async () => {
  // let tray = null;
  const appFolder = path.dirname(process.execPath);
  const appExePath = path.join(appFolder, 'build/win-unpacked/KioskApp.exe');

  app.setLoginItemSettings({
    openAtLogin: true,
    path: appExePath,
    args: ['--hidden']
  });

  async function createWindow() {
    const win = new BrowserWindow({
      width: 1080,
      height: 1920,
      fullscreen: true, // Kích hoạt toàn màn hình
      frame: false, // Ẩn thanh công cụ
      icon: path.join(__dirname, 'public/image/app-icon.ico'),
      webPreferences: {
        preload: path.join(__dirname, "preload.js"), // Preload nếu cần
        nodeIntegration: true, // Bảo mật: Tắt truy cập trực tiếp vào Node.js
        allowRunningInsecureContent: true,
      },
    });

    if (app.isPackaged && loadURL) {
      await loadURL(win);
      await win.loadURL("app://-");
    } else {
      win.loadURL("http://localhost:3000");
      win.webContents.openDevTools();
    }

    ipcMain.on("before-print", (event: Electron.Event) => {
      win.webContents.print({ silent: true });
      event.preventDefault(); // Ngăn chặn hành động in mặc định
    });

    // Lắng nghe sự kiện 'print-content' từ renderer process
    ipcMain.on("print-content", (event, content) => {
      // Tạo một cửa sổ mới để in, cửa sổ này sẽ không hiển thị
      const printWindow = new BrowserWindow({ show: false });
      printWindow.loadURL(
        `data:text/html;charset=utf-8,${encodeURIComponent(content)}`
      );

      // Khi cửa sổ in tải xong, thực hiện lệnh in
      printWindow.webContents.on("did-finish-load", async () => {
        const printers = await printWindow.webContents.getPrintersAsync();

        // Tìm máy in mặc định
        const defaultPrinter = printers.find((printer) => printer.isDefault);
        const deviceName = defaultPrinter ? defaultPrinter.name : ""; // Lấy tên máy in mặc định
        printWindow.webContents.print(
          {
            margins: { marginType: "none" },
            silent: true, // In mà không yêu cầu xác nhận
            printBackground: true, // In nền của trang (background)
            deviceName: deviceName,
          },
          (success, errorType) => {
            if (!success) {
              console.error("In thất bại:", errorType);
            }
            printWindow.close(); // Đóng cửa sổ in sau khi in xong
          }
        );
      });
    });
  }

  // Khi ứng dụng đã sẵn sàng
  await app.whenReady().then(createWindow);

  // Khi tất cả cửa sổ bị đóng
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  ipcMain.on('close-app', () => {
    app.quit();
  });

  // Khi ứng dụng được kích hoạt lại (dành cho macOS)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();
