import { Badge, Spinner } from "@chakra-ui/react";
import { useIPCStatus } from "../../hooks/useIPCStatus";

export const NVMStatus = () => {
    const { nvm } = useIPCStatus();
    if (nvm === null) return <Spinner size={"xs"} />;  
    if (nvm.error) return <Badge colorScheme={"red"} variant={"solid"}>NVM: {nvm.error}</Badge>
    if (!nvm.version) return <Badge colorScheme={"red"} variant={"solid"}>NVM: couldn't detect version</Badge>
    return <Badge colorScheme={"green"} variant={"solid"}>NVM: {nvm.version}</Badge>
};