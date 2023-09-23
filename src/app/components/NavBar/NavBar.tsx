import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IPCStatus } from '../IPCStatus/IPCStatus'
import { NVMStatus } from '../NVMStatus/NVMStatus'
import { SettingsLink } from '../SettingsLink/SettingsLink'

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={'10'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'bold'}>Nodeger</Text>
                    </Box>

                    <Flex alignItems={'center'} gap={"1"}>
                        <NVMStatus />
                        <IPCStatus />
                        <Button bgColor='transparent' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <SettingsLink />
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}