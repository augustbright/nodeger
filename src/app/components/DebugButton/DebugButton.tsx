import { IconButton } from "@chakra-ui/react";
import { BugIcon } from "../../icons/BugIcon";
import { useAtom } from "jotai";
import * as atoms from "../../atoms";

export const DebugButton = () => {
    const [debugActive, setDebugActive] = useAtom(atoms.debugActive);

    return <IconButton
        bg={debugActive ? 'blue.500' : 'transparent'}
        aria-label='Debug'
        icon={<BugIcon />}
        onClick={() => setDebugActive(!debugActive)}
    />;
};