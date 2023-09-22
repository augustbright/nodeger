import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';
import NavBar from './components/NavBar/NavBar';
import { IPCStatusProvider } from './components/IPCStatusProvider/IPCStatusProvider';

export const App = () => {
    return <ChakraProvider theme={theme}>
        <IPCStatusProvider>
            <NavBar />
        </IPCStatusProvider>
    </ChakraProvider>;
}