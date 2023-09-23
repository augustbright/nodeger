import { useContext } from "react";
import { SettingsContext } from "../components/SettingsProvider/SettingsProvider";

export const useSettings = () => useContext(SettingsContext);