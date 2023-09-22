declare const versions: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
};

declare const api: {
    ping: () => Promise<string>;
};