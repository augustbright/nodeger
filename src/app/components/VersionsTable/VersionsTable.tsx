import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { NodeVersionRow } from "../NodeVersionRow/NodeVersionRow";
import React from "react";

export const VersionsTable = React.memo(({
    versions
}: {
    versions: TNodeVersion[]
}) => {
    return (
        <TableContainer>
            <Table variant='simple' size='sm'>
                <Thead>
                    <Tr>
                        <Th>Status</Th>
                        <Th w='100%'>Version</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        versions.map((version) => (
                            <NodeVersionRow key={version.id} version={version} />
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
});