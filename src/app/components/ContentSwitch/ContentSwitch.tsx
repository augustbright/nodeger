import { Route, Routes } from "react-router";
import { HomePage } from "../../pages/Home/HomePage";
import { SettingsPage } from "../../pages/Settings/SettingsPage";

export const ContentSwitch = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};