import { useMutation, useQueryClient } from "react-query";
import { API } from "../../shared/const";
import { useCallback } from "react";

export const useSyncVersions = () => {
    const queryClient = useQueryClient();
    return useMutation(useCallback(async () => api.nvm.sync(), [queryClient]), {
        onSuccess() {
            queryClient.invalidateQueries(API.NVM.LS_LOCAL);
            queryClient.invalidateQueries(API.NVM.LS_REMOTE);
            queryClient.invalidateQueries(API.NVM.LAST_SYNC);
        },
        mutationKey: API.NVM.SYNC,
    });
};