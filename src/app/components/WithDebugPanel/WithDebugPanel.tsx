import { Divider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import * as atoms from "../../atoms";
import { useSettings } from "../../hooks/useSettings";
import { Debug } from "../Debug/Debug";

export const WithDebugPanel = ({ children }: {
    children: React.ReactNode
}) => {
    const [debugActive] = useAtom(atoms.debugActive);
    const { data: settings } = useSettings();

    if (!settings) { return null; }

    return (
        <PanelGroup direction="horizontal">
            <Panel minSize={25} order={1}>
                {children}
            </Panel>

            {
                debugActive && settings.debugMode && (
                    <>
                        <PanelResizeHandle>
                            <Divider orientation="vertical" mx={2} borderLeftWidth={3} />
                        </PanelResizeHandle>

                        <Panel id="sidebar" minSize={5} order={2} style={{ overflowY: 'auto' }}>
                            <Debug />
                        </Panel>
                    </>
                )
            }
        </PanelGroup>
    );
}