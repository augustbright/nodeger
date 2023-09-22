import { createContext, useEffect, useState } from "react";
import { checkIPCStatus } from "../../func/checkIPCStatus";

export const IPCStatusContext = createContext<boolean | null>(null);

const IPC_POLLING_INTERVAL = 1000;

export const IPCStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [ok, setOk] = useState<boolean | null>(null);
    useEffect(() => {
        const interval = setInterval(async () => {
            setOk(await checkIPCStatus());
        }, IPC_POLLING_INTERVAL);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <IPCStatusContext.Provider value={ok}>{children}</IPCStatusContext.Provider>;
};