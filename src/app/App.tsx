import { MemoryRouter } from 'react-router-dom';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import theme from './theme';
import NavBar from './components/NavBar/NavBar';
import { IPCStatusProvider } from './components/IPCStatusProvider/IPCStatusProvider';
import { ContentSwitch } from './components/ContentSwitch/ContentSwitch';
import { Footer } from './components/Footer/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DebugProvider } from './components/DebugProvider/DebugProvider';

const queryClient = new QueryClient();

export const App = () => {
    return <MemoryRouter>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme} toastOptions={{
                defaultOptions: {
                    position: 'bottom-left'
                }
            }}>
                <IPCStatusProvider>
                    <Stack direction={'column'} h={'100vh'} gap={0}>
                        <NavBar />
                        <Box flexGrow={1}>
                            <DebugProvider>
                                <ContentSwitch />
                            </DebugProvider>
                        </Box>
                        <Footer />
                    </Stack>
                </IPCStatusProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </MemoryRouter>;
}