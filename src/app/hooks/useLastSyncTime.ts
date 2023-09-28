import { useQuery } from "react-query";
import { API } from "../../shared/const";

export const useLastSyncTime = () => useQuery(API.NVM.LAST_SYNC, async () => {
    const { error, result } = await api.nvm.lastSync();
    if (error) throw new Error(error);
    if (!result) return 'No last sync time found.';

    const date = new Date(result);
    return date.toLocaleString();
});