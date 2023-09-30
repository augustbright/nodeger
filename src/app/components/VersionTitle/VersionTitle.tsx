import { Badge, Flex, Text } from "@chakra-ui/react";

export const VersionTitle = ({ version }: {
    version: TNodeVersion
}) => (
    <>
        <Flex gap={3} alignItems='center'>
            <Text>{version.id}</Text>
            {
                version.codename && <Badge variant={"subtle"}>LTS: {version.codename}</Badge>
            }
            {
                version.latestLTS && <Badge colorScheme="teal" variant={"subtle"}>Latest</Badge>
            }
        </Flex>
    </>
);