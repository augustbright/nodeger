import { Flex, IconButton, Text } from "@chakra-ui/react"
import { NVMLS } from "../../components/NVMLS/NVMLS"
import { Page } from "../../components/Page/Page"
import { RepeatIcon } from "@chakra-ui/icons"
import { useNVMVersions } from "../../hooks/useNVMVersions"
import { LastSync } from "../../components/LastSync/LastSync"
import { useSyncVersions } from "../../hooks/useSyncVersions"

export const HomePage = () => {
    const { isFetching: isFetchingVersions } = useNVMVersions();
    const { mutate: sync, isLoading: isSyncing } = useSyncVersions();

    return (
        <Page>
            <Flex px={2} py={2} gap={1} justifyContent="flex-start">
                <Text fontSize='xl' fontWeight='bold'>Browse versions</Text>
                <IconButton
                    size="sm"
                    bg="transparent"
                    aria-label='Update'
                    icon={<RepeatIcon />}
                    isLoading={isSyncing || isFetchingVersions}
                    onClick={() => !isSyncing && sync()}
                />
                <LastSync />
            </Flex>
            <NVMLS />
        </Page>
    )
}