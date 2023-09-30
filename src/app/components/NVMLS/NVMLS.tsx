import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useNVMVersions } from "../../hooks/useNVMVersions";
import { SearchIcon } from "@chakra-ui/icons";
import { VersionsTable } from "../VersionsTable/VersionsTable";
import { LastSync } from "../LastSync/LastSync";
import { searchQuery as searchQueryAtom } from "../../atoms";
import { useAtom } from "jotai";

export const NVMLS = () => {
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
    const { data } = useNVMVersions({ searchQuery });
    if (!data) { return null; }

    return (
        <Flex px={2} direction='column' justifyContent='flex-start' gap={3} h="100%">
            <Flex direction='column' gap={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant='filled'
                        placeholder='Search'
                    />
                </InputGroup>
            </Flex>
            {
                data.error && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Could not fetch node versions</AlertTitle>
                    <AlertDescription>{data.error}</AlertDescription>
                </Alert>
            }

            <Accordion defaultIndex={[0]} allowMultiple h="calc(100% - 0.75rem - 40px)" overflowY='auto'>
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