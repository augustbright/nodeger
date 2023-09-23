import { Flex, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Page } from "../../components/Page/Page";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { GeneralSettings } from "../../components/GeneralSettings/GeneralSettings";

export const SettingsPage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Tabs size='sm' variant='enclosed'>
                <Flex px={2} py={2} justifyContent="space-between">
                    <Text fontSize='xl' fontWeight='bold'>Settings</Text>
                    <IconButton
                        size="sm"
                        bg="transparent"
                        aria-label='Close'
                        icon={<CloseIcon />}
                        onClick={() => navigate('/')}
                    />
                </Flex>
                <TabList>
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