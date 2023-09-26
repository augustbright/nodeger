import { createContext, useEffect, useState } from "react";

type TOutputContextType = {
    output: TOutput[];
};

export const OutputContext = createContext<TOutputContextType>({
    output: []
});

export const OutputProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [output, setOutput] = useState<TOutput[]>([]);

    useEffect(() => {
        api.onOutput((output) => {
            setOutput((prev) => [...prev, output]);
        });
    }, []);

    return (
        <OutputContext.Provider value={{ output }}>
            {children}
        </OutputContext.Provider>
    );
}