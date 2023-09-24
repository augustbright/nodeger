declare type TSettings = Awaited<ReturnType<typeof api.settings.get>>;

declare type TSettingsValidation = Partial<{
    [key in keyof TSettings]: string;
}>;

declare type TNodeVersion = {
    id: string;
    aliases: string[];
    current: boolean;
};

declare type TInvokeResponse<T = string> = {
    error?: string;
    result?: T;
};

declare const versions: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
};

declare const api: {
    debug: {
        ping: () => Promise<string>;
    };
    settings: {
        get: () => Promise<{
            nvmPath: string;
            debugMode: boolean;
        }>;
        set: (settings: TSettings) => Promise<TInvokeResponse>;
        validate: (settings: TSettings) => Promise<TSettingsValidation>;
    };
    nvm: {
        lsLocal: () => Promise<TInvokeResponse<TNodeVersion[]>>;
        version: () => Promise<TInvokeResponse>;
        use: (version: string) => Promise<TInvokeResponse>;
    };    
};