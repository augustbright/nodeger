import { Flex, Td, Text, Tr } from "@chakra-ui/react";

export const OutputItem = ({ output }: { output: TOutput }) => {
    return (
        <Tr>
            <Td>
                <Flex direction='column'>
                    <Text whiteSpace='nowrap'>{new Date(output.timestamp).toISOString()}</Text>
                    <Text whiteSpace='nowrap' color='gray.500'>{output.command}</Text>
                </Flex>
            </Td>
            <Td><pre>{output.message}</pre></Td>
        </Tr>
    );
}