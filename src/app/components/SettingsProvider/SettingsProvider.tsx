import { createContext, useCallback, useEffect, useState } from "react";

type TSettingsContextType = {
    settings: TSettings;
    reloadSettings: () => void;
};

export const SettingsContext = createContext<TSettingsContextType>({
    settings: {
        nvmPath: ''
    },
    reloadSettings: () => undefined
});


export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<TSettings | null>(null);
    const reloadSettings = useCallback(async () => {
        const newSettings = await api.settings.get();
        setSettings(newSettings);
    }, [setSettings]);

    useEffect(() => {
        reloadSettings();
    }, []);

    if (!settings) {
        return null;
    }

    console.log(settings);

    return <SettingsContext.Provider value={{ settings, reloadSettings }}>{children}</SettingsContext.Provider>;
};