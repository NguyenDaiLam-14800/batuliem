// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data);
  },
  // Nếu cần thêm các hàm khác từ ipcRenderer, có thể expose ở đây
});
