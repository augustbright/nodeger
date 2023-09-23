import { Divider, Stack, Text } from "@chakra-ui/react";
import { useIPCStatus } from "../../hooks/useIPCStatus";

export const VersionsInfo = () => {
    const {service: ipcOk} = useIPCStatus();
    return (
        <Stack spacing={1} p={"2"}>
            {ipcOk && <Text fontSize='md' color={"green"} fontWeight={"bold"}>Service is responding</Text> }
            {ipcOk === false && <Text fontSize='md' color={"red"} fontWeight={"bold"}>Service is not responding</Text> }
            {ipcOk === null && <Text fontSize='md' color={"yellow"} fontWeight={"bold"}>Waiting for respond...</Text> }
            <Divider />
            <Text fontSize='sm'>electron: {versions.electron()}</Text>
            <Text fontSize='sm'>node: {versions.node()}</Text>
            <Text fontSize='sm'>chrome: {versions.chrome()}</Text>
        </Stack>
    );
};