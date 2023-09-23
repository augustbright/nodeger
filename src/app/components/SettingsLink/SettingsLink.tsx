import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const SettingsLink = () => {
    const navigate = useNavigate();    
    return <IconButton onClick={() => navigate('/settings', {})} bgColor='transparent' aria-label='Settings' icon={<SettingsIcon />} />
};