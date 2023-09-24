import { Button, Divider, Flex, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Page } from "../../components/Page/Page";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { GeneralSettings } from "../../components/GeneralSettings/GeneralSettings";

export const SettingsPage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Tabs size='sm' variant='line'>
                <TabList>
                    <Flex py={2} justifyContent="flex-start">
                        <Button
                            size="sm"
                            bg="transparent"
                            aria-label='Close'
                            leftIcon={<ArrowLeftIcon />}
                            onClick={() => navigate('/')}
                        >Back</Button>
                        <Divider mx={2} orientation="vertical" />
                    </Flex>
                    <Tab>General</Tab>
                    <Tab>About</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <GeneralSettings />
                    </TabPanel>
                    <TabPanel>
                        <p>about</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Page>
    )
}