import { createContext, useCallback, useEffect, useState } from "react";
import { checkIPCStatus } from "../../func/checkIPCStatus";

type TContextValue = {
    service: boolean | null;
    nvm: {
        version?: string;
        error?: string;
    } | null;
    reloadNVM: () => void;
};

export const IPCStatusContext = createContext<TContextValue>({
    nvm: undefined,
    service: undefined,
    reloadNVM: () => undefined
});

const IPC_POLLING_INTERVAL = 10000;

export const IPCStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [service, setService] = useState<TContextValue['service']>(null);
    const [nvm, setNVM] = useState<TContextValue['nvm']>(null);

    const reloadNVM = useCallback(async () => {
        setNVM(null);
        const response = await api.nvmVersion();
        setNVM({
            version: response.result,
            error: response.error
        });
    }, [setNVM]);

    useEffect(() => {
        const interval = setInterval(async () => {
            setService(await checkIPCStatus());
        }, IPC_POLLING_INTERVAL);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        reloadNVM();
    }, []);

    return <IPCStatusContext.Provider value={{
        service,
        nvm,
        reloadNVM
    }}>{children}</IPCStatusContext.Provider>;
};