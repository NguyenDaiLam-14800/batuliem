// global.d.ts
export { };

declare global {
    interface Window {
        ipcRenderer: {
            send: (channel: string, data: unknown) => void;
        };
    }
}