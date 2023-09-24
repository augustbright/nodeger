import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useMatch, useNavigate } from "react-router";

export const SettingsLink = () => {
    const navigate = useNavigate();
    const settingsMatch = useMatch('/settings');

    return <IconButton
        onClick={() => settingsMatch ? navigate('/') : navigate('/settings', {})}
        bgColor={settingsMatch ? 'blue.500' : 'transparent'}
        aria-label='Settings'
        icon={<SettingsIcon />}
    />
};