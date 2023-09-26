import { Box, Stack } from '@chakra-ui/react'
import NavBar from './components/NavBar/NavBar';
import { ContentSwitch } from './components/ContentSwitch/ContentSwitch';
import { Footer } from './components/Footer/Footer';
import { WithDebugPanel } from './components/WithDebugPanel/WithDebugPanel';
import { Providers } from './providers/Providers';

export const App = () => {
    return (
        <Providers>
            <Stack direction={'column'} h={'100vh'} gap={0}>
                <NavBar />
                <Box flexGrow={1}>
                    <WithDebugPanel>
                        <ContentSwitch />
                    </WithDebugPanel>
                </Box>
                <Footer />
            </Stack>
        </Providers>
    );
}