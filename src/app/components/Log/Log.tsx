import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { LogContext } from "../../providers/LogProvider/LogProvider";

export const Log = () => {
    const { log } = useContext(LogContext);
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
            <Text whiteSpace='pre-wrap' fontSize='sm' fontFamily='monospace'>
                {JSON.stringify(log, null, 2)}
            </Text>
        </Box>
    );
}