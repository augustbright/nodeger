import { Badge, Tooltip } from "@chakra-ui/react";
import { VersionsInfo } from "../VersionsInfo/VersionsInfo";
import { useIPCStatus } from "../../hooks/useIPCStatus";

export const IPCStatus = () => {
    const ok = useIPCStatus();
    return <Tooltip label={<VersionsInfo />} >
        <Badge variant='outline' colorScheme={ok ? 'green' : 'red'}>
            IPC
        </Badge>
    </Tooltip>;
};