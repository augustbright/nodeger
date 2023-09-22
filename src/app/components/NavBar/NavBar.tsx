import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IPCStatus } from '../IPCStatus/IPCStatus'

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={'10'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'bold'}>NVM GUI</Text>
                    </Box>

                    <Flex alignItems={'center'} gap={"1"}>
                        <IPCStatus />
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}