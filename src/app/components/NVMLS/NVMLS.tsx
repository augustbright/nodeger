import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Input, InputGroup, InputLeftElement, Switch } from "@chakra-ui/react";
import { useNVMVersions } from "../../hooks/useNVMVersions";
import { NodeVersionItem } from "../NodeVersionItem/NodeVersionItem";
import { SearchIcon } from "@chakra-ui/icons";
import { useAtom } from "jotai";
import { showOnlyLocalAtom } from "../../atoms";

export const NVMLS = () => {
    const { data } = useNVMVersions();
    const [showOnlyLocal, setShowOnlyLocal] = useAtom(showOnlyLocalAtom);
    if (!data) { return null; }

    return (
        <Flex px={2} direction='column' justifyContent='flex-start' gap={3}>
            <Flex direction='column' gap={4}>
                <Switch
                    isChecked={showOnlyLocal}
                    onChange={(e) => setShowOnlyLocal(e.currentTarget.checked)}
                >
                    Only installed
                </Switch>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input variant='filled' placeholder='Search' />
                </InputGroup>
            </Flex>
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