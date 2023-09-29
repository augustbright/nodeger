import { useMutation, useQueryClient } from "react-query"
import { API } from "../../shared/const";

export const useDeleteVersion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (version: TNodeVersion) => {
            const result = await api.nvm.uninstall(version.id);
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(API.NVM.LS_LOCAL);
            queryClient.invalidateQueries(API.NVM.LS_REMOTE);
        }
    });
}