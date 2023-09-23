import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router";

export const Footer = () => {
    const location = useLocation();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={'5'} alignItems={'center'} justifyContent={'flex-start'}>
                <Box>
                    <Text fontSize={'2xs'}>{location.pathname}</Text>
                </Box>
            </Flex>
        </Box>
    );
};