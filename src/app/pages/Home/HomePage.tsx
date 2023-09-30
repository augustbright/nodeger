import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { NVMLS } from "../../components/NVMLS/NVMLS"
import { Page } from "../../components/Page/Page"
import { useNVMVersions } from "../../hooks/useNVMVersions"
import { VersionTitle } from "../../components/VersionTitle/VersionTitle"

export const HomePage = () => {
    const { data } = useNVMVersions();
    return (
        <Page>
            <Flex px={2} py={2} gap={3} direction='column'>
                {data?.current && (
                    <>
                        <Heading size='xs'>You are currently using:</Heading>
                        <VersionTitle version={data?.current} />
                    </>
                )}
            </Flex>
            <Flex px={2} py={2} gap={1} justifyContent="flex-start">
                <Heading fontSize='xs'>Browse versions</Heading>
            </Flex>
            <Box h="calc(100% - 46px)">
                <NVMLS />
            </Box>
        </Page>
    )
}