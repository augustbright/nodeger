import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import theme from "../theme";
import { IPCStatusProvider } from "../components/IPCStatusProvider/IPCStatusProvider";
import { OutputProvider } from "./OutputProvider/OutputProvider";
import { LogProvider } from "./LogProvider/LogProvider";

const queryClient = new QueryClient();

export const Providers = ({ children }: {
    children: React.ReactNode
}) => (
    <MemoryRouter>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme} toastOptions={{
                defaultOptions: {
                    position: 'bottom-left'
                }
            }}>
                <IPCStatusProvider>
                    <OutputProvider>
                        <LogProvider>
                            {children}
                        </LogProvider>
                    </OutputProvider>
                </IPCStatusProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </MemoryRouter>
);