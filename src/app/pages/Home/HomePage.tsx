import { Box, Flex, Text } from "@chakra-ui/react"
import { NVMLS } from "../../components/NVMLS/NVMLS"
import { Page } from "../../components/Page/Page"

export const HomePage = () => {
    return (
        <Page>
            <Flex px={2} py={2} gap={1} justifyContent="flex-start">
                <Text fontSize='xl' fontWeight='bold'>Browse versions</Text>
            </Flex>
            <Box h="calc(100% - 46px)">
                <NVMLS />
            </Box>
        </Page>
    )
}