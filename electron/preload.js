"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// preload.ts
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
        electron_1.ipcRenderer.send(channel, data);
    },
    // Nếu cần thêm các hàm khác từ ipcRenderer, có thể expose ở đây
});
