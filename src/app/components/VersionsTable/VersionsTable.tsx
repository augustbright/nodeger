import { Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { NodeVersionRow } from "../NodeVersionRow/NodeVersionRow";

export const VersionsTable = ({
    versions
}: {
    versions: TNodeVersion[]
}) => {
    return (
        <TableContainer>
            <Table variant='simple'>
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
};