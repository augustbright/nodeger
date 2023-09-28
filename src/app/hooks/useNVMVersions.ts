import { useQuery } from "react-query";
import { API } from "../../shared/const";
import { useAtom } from "jotai";
import { showOnlyLocalAtom } from "../atoms";

export const useNVMVersions = () => {
    const [showOnlyLocal] = useAtom(showOnlyLocalAtom);

    return useQuery(API.NVM.LS_LOCAL, async () => {
        const local = await api.nvm.lsLocal();
        const remote = await api.nvm.lsRemote();
        const currentVersion = await api.nvm.version();
        const error = local.error || remote.error;

        const versions: TNodeVersion[] = (remote.result || [])?.map((remoteVersion) => {
            const localVersion = local.result?.find((localVersion) => localVersion.id === remoteVersion.id);
            return {
                id: remoteVersion.id,
                codename: remoteVersion.codename,
                latestLTS: remoteVersion.latestLTS,
                local: !!localVersion,
                aliases: localVersion?.aliases || [],
                default: currentVersion.result === remoteVersion.id,
            };
        });

        return {
            local,
            remote,
            result: versions,
            error
        }
    }, {
        select: (data) => ({
            ...data,
            result: data.result.filter((version) => showOnlyLocal ? version.local : true)
        })
    });
};