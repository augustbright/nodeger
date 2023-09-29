type TSettings = Awaited<ReturnType<typeof api.settings.get>>;

type TSettingsValidation = Partial<{
    [key in keyof TSettings]: string;
}>;

type TLocalNodeVersion = {
    id: string;
    aliases: string[];
};

type TRemoteNodeVersion = {
    id: string,
    codename: string | null,
    latestLTS: boolean,
};

type TNodeVersion = {
    id: string;
    local: boolean;
    aliases: string[];
    codename: string | null;
    latestLTS: boolean;
    default: boolean;
};

type TInvokeResponse<T = string> = {
    error?: string;
    result?: T;
};

type TOutput = {
    type: 'info' | 'error';
    message: string;
    pid: number | undefined;
    timestamp: number;
    command: string;
};

type TLogMessage = {
    type: 'info' | 'error';
    message: string;
    timestamp: number;
}

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
            shell: string;
            shellContext: string;
            debugMode: boolean;
        }>;
        set: (settings: TSettings) => Promise<TInvokeResponse>;
        validate: (settings: TSettings) => Promise<TSettingsValidation>;
    };
    nvm: {
        lsLocal: () => Promise<TInvokeResponse<TLocalNodeVersion[]>>;
        lsRemote: () => Promise<TInvokeResponse<TRemoteNodeVersion[]>>;
        version: () => Promise<TInvokeResponse>;
        use: (version: string) => Promise<TInvokeResponse>;
        sync: () => Promise<TInvokeResponse>;
        lastSync: () => Promise<TInvokeResponse<number>>;
        install: (version: string) => Promise<TInvokeResponse>;
        uninstall: (version: string) => Promise<TInvokeResponse>;
    };
    onOutput: (listener: (output: TOutput) => void) => void;
    onLog: (listener: (log: TLogMessage) => void) => void;
};