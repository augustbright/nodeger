import { useQuery } from "react-query";
import { API } from "../../shared/const";

export const useNVMVersions = ({ searchQuery }: {
    searchQuery?: string;
} = {}) => {
    return useQuery(API.NVM.LS_LOCAL, async () => {
        const localVersions = await api.nvm.lsLocal();
        const remoteVersions = await api.nvm.lsRemote();
        const currentVersion = await api.nvm.version();
        const error = localVersions.error || remoteVersions.error;

        const versions: TNodeVersion[] = (remoteVersions.result || [])?.map((remoteVersion) => {
            const localVersion = localVersions.result?.find((localVersion) => localVersion.id === remoteVersion.id);
            return {
                id: remoteVersion.id,
                codename: remoteVersion.codename,
                latestLTS: remoteVersion.latestLTS,
                local: !!localVersion,
                aliases: localVersion?.aliases || [],
                default: currentVersion.result === remoteVersion.id,
            };
        });

        const local = versions.filter((version) => version.local);
        const remote = versions.filter((version) => !version.local);

        const current = versions.find((version) => version.default);

        return {
            local,
            remote,
            error,
            current
        }
    }, {
        select(data) {
            return {
                ...data,
                local: data.local.filter((version) => !searchQuery || version.id.includes(searchQuery)),
                remote: data.remote.filter((version) => !searchQuery || version.id.includes(searchQuery)),
            };
        },
    });
};