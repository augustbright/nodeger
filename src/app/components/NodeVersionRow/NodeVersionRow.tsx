import { Badge, Button, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { useSetCurrentNVMVersion } from "../../hooks/useSetCurrentNVMVersion";
import { useMemo } from "react";
import { useNVMVersions } from "../../hooks/useNVMVersions";

export const NodeVersionRow = ({ version }: {
    version: TNodeVersion
}) => {
    const { data } = useNVMVersions();
    const setCurrentVersion = useSetCurrentNVMVersion();

    const status = useMemo(() => {
        if (version.default) {
            return <Badge colorScheme="green" variant={"outline"}>Default</Badge>;
        }
        if (version.local) {
            return <Text >Installed</Text>;
        }
    }, [version]);

    return (
        <Tr>
            <Td>
                {status}
            </Td>
            <Td>
                <Flex gap={3}>
                    <Text fontSize='lg'>{version.id}</Text>
                    {
                        version.codename && <Badge variant={"subtle"}>LTS: {version.codename}</Badge>
                    }
                    {
                        version.latestLTS && <Badge colorScheme="teal" variant={"subtle"}>Latest</Badge>
                    }
                </Flex>
            </Td>
            <Td>
                {
                    !version.default && version.local && <Button
                        variant={"outline"}
                        size='md'
                        onClick={() => setCurrentVersion(version.id)}>
                        Use
                    </Button>
                }
            </Td>
        </Tr>
    );
};