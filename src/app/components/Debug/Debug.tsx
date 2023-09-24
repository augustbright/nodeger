import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export const Debug = () => {
    return (
        <Tabs size='sm' variant='line'>
            <TabList>
                <Tab>Output</Tab>
                <Tab>Logs</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div>output</div>
                </TabPanel>
                <TabPanel>
                    <div>logs</div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};