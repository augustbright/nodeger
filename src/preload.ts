import { contextBridge, ipcRenderer } from 'electron';
import { API, EVENTS } from './shared/const';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('api', {
    debug: {
        ping: () => ipcRenderer.invoke(API.PING)
    },
    settings: {
        get: () => ipcRenderer.invoke(API.SETTINGS.GET),
        set: (settings: TSettings) => ipcRenderer.invoke(API.SETTINGS.SET, settings),
        validate: (settings: TSettings) => ipcRenderer.invoke(API.SETTINGS.VALIDATE, settings),
    },
    nvm: {
        lsLocal: () => ipcRenderer.invoke(API.NVM.LS_LOCAL),
        lsRemote: () => ipcRenderer.invoke(API.NVM.LS_REMOTE),
        version: () => ipcRenderer.invoke(API.NVM.VERSION),
        use: (version: string) => ipcRenderer.invoke(API.NVM.USE, version),
        sync: () => ipcRenderer.invoke(API.NVM.SYNC),
        lastSync: () => ipcRenderer.invoke(API.NVM.LAST_SYNC),
        install: (version: string) => ipcRenderer.invoke(API.NVM.INSTALL, version),
        uninstall: (version: string) => ipcRenderer.invoke(API.NVM.UNINSTALL, version),
    },
    onOutput: (listener: (output: TOutput) => void) => {
        ipcRenderer.on(EVENTS.OPUTPUT, (_event, data) => listener(data));
    },
    onLog: (listener: (log: TLogMessage) => void) => {
        ipcRenderer.on(EVENTS.LOG, (_event, data) => listener(data));
    },
} as typeof api);