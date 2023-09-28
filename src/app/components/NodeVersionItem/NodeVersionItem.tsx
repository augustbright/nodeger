import { Badge, Button, Flex, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useSetCurrentNVMVersion } from "../../hooks/useSetCurrentNVMVersion";

export const NodeVersionItem = ({ version }: {
    version: TNodeVersion
}) => {
    const setCurrentVersion = useSetCurrentNVMVersion();
    return <Flex p='2' minH="60px" borderBottom='1px' borderColor={useColorModeValue('gray.200', 'gray.700')} justifyContent='flex-start' alignItems='center' gap={4}>
        <Text fontSize='lg'>{version.id}</Text>
        {
            version.default && <Badge colorScheme="green" variant={"outline"}>Current</Badge>
        }
        <Spacer />
        {
            !version.default && version.local && <Button
                variant={"outline"}
                size='md'
                onClick={() => setCurrentVersion(version.id)}>
                Use
            </Button>
        }
    </Flex>
};