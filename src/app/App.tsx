import { ChakraProvider } from '@chakra-ui/react'
import { VersionsInfo } from './components/VersionsInfo/VersionsInfo';
import theme from './theme';

export const App = () => {
    return <ChakraProvider theme={theme}>
        <VersionsInfo />
    </ChakraProvider>;
}