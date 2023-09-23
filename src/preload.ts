import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('api', {
    ping: () => ipcRenderer.invoke('ping'),
    settings: {
        get: () => ipcRenderer.invoke('get-settings'),
        set: (settings: TSettings) => ipcRenderer.invoke('set-settings', settings),
        validate: (settings: TSettings) => ipcRenderer.invoke('validate-settings', settings),    
    },
    nvmVersion: () => ipcRenderer.invoke('nvm-version'),
});