declare type TSettings = Awaited<ReturnType<typeof api.settings.get>>;

declare type TSettingsValidation = Partial<{
    [key in keyof TSettings]: string;
}>;

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
    ping: () => Promise<string>;
    settings: {
        get: () => Promise<{
            nvmPath: string;
        }>;
        set: (settings: TSettings) => Promise<TInvokeResponse>;
        validate: (settings: TSettings) => Promise<TSettingsValidation>;
    };
    nvmVersion: () => Promise<TInvokeResponse>;
};