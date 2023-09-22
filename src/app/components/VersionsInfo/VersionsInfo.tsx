import { Card, CardBody, Stack, Text } from "@chakra-ui/react";

export const VersionsInfo = () => {
    return (
        <Card>
            <CardBody>
                <Stack spacing={3}>
                    <Text fontSize='sm'>electron: {versions.electron()}</Text>
                    <Text fontSize='sm'>node: {versions.node()}</Text>
                    <Text fontSize='sm'>chrome: {versions.chrome()}</Text>
                </Stack>
            </CardBody>
        </Card>
    );
};