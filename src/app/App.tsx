import { MemoryRouter } from 'react-router-dom';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import theme from './theme';
import NavBar from './components/NavBar/NavBar';
import { IPCStatusProvider } from './components/IPCStatusProvider/IPCStatusProvider';
import { ContentSwitch } from './components/ContentSwitch/ContentSwitch';
import { Footer } from './components/Footer/Footer';
import { SettingsProvider } from './components/SettingsProvider/SettingsProvider';
import { ToastContainer } from 'react-toastify';

export const App = () => {
    return <MemoryRouter>
        <ChakraProvider theme={theme}>
            <SettingsProvider>
                <IPCStatusProvider>
                    <Stack direction={'column'} h={'100vh'}>
                        <NavBar />
                        <Box flexGrow={1}>
                            <ContentSwitch />
                        </Box>
                        <ToastContainer
                            position="bottom-left"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                        <Footer />
                    </Stack>
                </IPCStatusProvider>
            </SettingsProvider>
        </ChakraProvider>
    </MemoryRouter>;
}