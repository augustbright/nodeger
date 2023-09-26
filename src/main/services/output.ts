import { BrowserWindow } from "electron";
import { EVENTS } from "../../shared/const";

let browserWindow: BrowserWindow | undefined = undefined;

export const initOutputIPC = (window: BrowserWindow) => {
    browserWindow = window;
}

export const sendOutput = (output: Omit<TOutput, 'timestamp'>) => {
    browserWindow?.webContents.send(EVENTS.OPUTPUT, {
        ...output,
        timestamp: new Date().toISOString()
    });
};