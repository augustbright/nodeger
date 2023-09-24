import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";

export const About = () => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <Tbody>
                    <Tr>
                        <Td>Version</Td>
                        <Td>1.0.0</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};