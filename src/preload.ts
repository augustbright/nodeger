import { contextBridge, ipcRenderer } from 'electron';
import { API } from './shared/const';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('api', {
    ping: () => ipcRenderer.invoke(API.PING),
    settings: {
        get: () => ipcRenderer.invoke(API.SETTINGS.GET),
        set: (settings: TSettings) => ipcRenderer.invoke(API.SETTINGS.SET, settings),
        validate: (settings: TSettings) => ipcRenderer.invoke(API.SETTINGS.VALIDATE, settings),        
    },
    nvm: {
        lsLocal: () => ipcRenderer.invoke(API.NVM.LS_LOCAL),
        version: () => ipcRenderer.invoke(API.NVM.VERSION),
        use: (version: string) => ipcRenderer.invoke(API.NVM.USE, version),
    },
} as typeof api);