import { createContext, useEffect, useState } from "react";

type TLogContextType = {
    log: TLogMessage[];
};

export const LogContext = createContext<TLogContextType>({
    log: []
});

export const LogProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [log, setLog] = useState<TLogMessage[]>([]);

    useEffect(() => {
        api.onLog((message) => {
            setLog((prev) => [...prev, message]);
        });
    }, []);

    return (
        <LogContext.Provider value={{ log }}>
            {children}
        </LogContext.Provider>
    );
}