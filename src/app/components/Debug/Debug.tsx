import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Output } from "../Output/Output";
import { Log } from "../Log/Log";

export const Debug = () => {
    return (
        <Tabs size='sm' variant='line'>
            <TabList>
                <Tab>Output</Tab>
                <Tab>Logs</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Output />
                </TabPanel>
                <TabPanel>
                    <Log />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};