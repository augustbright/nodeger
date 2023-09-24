import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Text,
    Tag,
    Divider
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IPCStatus } from '../IPCStatus/IPCStatus'
import { NVMStatus } from '../NVMStatus/NVMStatus'
import { SettingsLink } from '../SettingsLink/SettingsLink'
import { DebugButton } from '../DebugButton/DebugButton'
import { useSettings } from '../../hooks/useSettings'

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();    
    const { data: settings } = useSettings();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={'10'} alignItems={'center'} justifyContent={'space-between'}>
                    <Flex alignItems='baseline' gap={2}>
                        <Text fontSize={'md'} fontWeight={'bold'}>Nodeger</Text>
                    </Flex>

                    <Flex alignItems={'center'} gap={"1"}>
                        <NVMStatus />
                        <IPCStatus />
                        <Button bgColor='transparent' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <SettingsLink />
                        {settings?.debugMode && <DebugButton />}
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}