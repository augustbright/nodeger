import { Box, Table, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { OutputContext } from "../../providers/OutputProvider/OutputProvider";
import { OutputItem } from "../OutputItem/OutputItem";

export const Output = () => {
    const { output } = useContext(OutputContext);
    return (
        <Box
            bg='gray.900'
            color='gray.400'
            flex='1'
            overflow='auto'
            p='2'
            sx={{
                '&::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    outline: '1px solid slategrey'
                }
            }}
        >
            <Table variant='simple' size='sm'>
                {output.map((item, index) => (
                    <OutputItem key={index} output={item} />
                ))}
            </Table>
        </Box>
    );
}