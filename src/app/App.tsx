import { MemoryRouter } from 'react-router-dom';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import theme from './theme';
import NavBar from './components/NavBar/NavBar';
import { IPCStatusProvider } from './components/IPCStatusProvider/IPCStatusProvider';
import { ContentSwitch } from './components/ContentSwitch/ContentSwitch';
import { Footer } from './components/Footer/Footer';
import { SettingsProvider } from './components/SettingsProvider/SettingsProvider';

export const App = () => {
    return <MemoryRouter>
        <ChakraProvider theme={theme} toastOptions={{
            defaultOptions: {
                position: 'bottom-left'
            }
        }}>
            <SettingsProvider>
                <IPCStatusProvider>
                    <Stack direction={'column'} h={'100vh'}>
                        <NavBar />
                        <Box flexGrow={1}>
                            <ContentSwitch />
                        </Box>
                        <Footer />
                    </Stack>
                </IPCStatusProvider>
            </SettingsProvider>
        </ChakraProvider>
    </MemoryRouter>;
}