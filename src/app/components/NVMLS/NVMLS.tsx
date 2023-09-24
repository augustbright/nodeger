import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from "@chakra-ui/react";
import { useNVMLocalVersions } from "../../hooks/useNVMLocalVersions";
import { NodeVersionItem } from "../NodeVersionItem/NodeVersionItem";

export const NVMLS = () => {
    const { data } = useNVMLocalVersions();    
    if (!data) { return null; }
    
    return (
        <Flex direction='column' justifyContent='flex-start'>
            {
                data.error && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Could not fetch node versions</AlertTitle>
                    <AlertDescription>{data.error}</AlertDescription>
                </Alert>
            }
            {
                data.result && data.result.map((version) => (
                    <NodeVersionItem key={version.id} version={version} />
                ))
            }
        </Flex>
    );
};