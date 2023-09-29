import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useNVMVersions } from "../../hooks/useNVMVersions";
import { SearchIcon } from "@chakra-ui/icons";
import { VersionsTable } from "../VersionsTable/VersionsTable";
import { LastSync } from "../LastSync/LastSync";

export const NVMLS = () => {
    const { data } = useNVMVersions();
    if (!data) { return null; }

    return (
        <Flex px={2} direction='column' justifyContent='flex-start' gap={3}>
            <Flex direction='column' gap={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input variant='filled' placeholder='Search' />
                </InputGroup>
            </Flex>
            {
                data.error && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Could not fetch node versions</AlertTitle>
                    <AlertDescription>{data.error}</AlertDescription>
                </Alert>
            }

            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem defaultChecked>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                <Text fontSize='lg'>Local</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} pl={0}>
                        <VersionsTable versions={data.local} />
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Flex flex='1' alignItems='center' gap={4}>
                                <Text fontSize='lg'>Remote</Text>
                                <LastSync />
                            </Flex>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VersionsTable versions={data.remote} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
};