export const API = {
    PING: 'ping',    
    NVM: {
        LS_LOCAL: 'nvm.ls-local',
        LS_REMOTE: 'nvm.ls-remote',
        VERSION: 'nvm.version',
        USE: 'nvm.use',
        SYNC: 'nvm.sync',
        LAST_SYNC: 'nvm.last-sync',
        INSTALL: 'nvm.install',
        UNINSTALL: 'nvm.uninstall',
    },
    SETTINGS: {
        GET: 'get-settings',
        SET: 'set-settings',
        VALIDATE: 'validate-settings',
    },
};

export const EVENTS = {
    OPUTPUT: 'output',
    LOG: 'log',
};