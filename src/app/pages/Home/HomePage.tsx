import { Flex, IconButton, Text } from "@chakra-ui/react"
import { NVMLS } from "../../components/NVMLS/NVMLS"
import { Page } from "../../components/Page/Page"
import { RepeatIcon } from "@chakra-ui/icons"
import { useNVMLocalVersions } from "../../hooks/useNVMLocalVersions"

export const HomePage = () => {
    const { refetch, isFetching } = useNVMLocalVersions();
    return (
        <Page>
            <Flex px={2} py={2} gap={1} justifyContent="flex-start">
                <Text fontSize='xl' fontWeight='bold'>Locally installed versions</Text>
                <IconButton
                    size="sm"
                    bg="transparent"
                    aria-label='Update'
                    icon={<RepeatIcon />}
                    isLoading={isFetching}
                    onClick={() => !isFetching && refetch()}
                />
            </Flex>
            <NVMLS />
        </Page>
    )
}