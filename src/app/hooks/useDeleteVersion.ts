import { useMutation, useQueryClient } from "react-query"
import { API } from "../../shared/const";
import { useToast } from "@chakra-ui/react";

export const useDeleteVersion = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: async (version: TNodeVersion) => {
            const result = await api.nvm.uninstall(version.id);
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: (_data, version) => {
            queryClient.invalidateQueries(API.NVM.LS_LOCAL);
            queryClient.invalidateQueries(API.NVM.LS_REMOTE);
            toast({
                title: `Node ${version.id} uninstalled.`,
                status: 'success',
                isClosable: true,
            });
        },
        onError(error, variables) {
            let message = 'Unknown error.';
            if (error instanceof Error) {
                message = error.message;
            }
            toast({
                title: `Node ${variables.id} failed to uninstall.`,
                status: 'error',
                description: message,
                isClosable: true,
            });        
        },
    });
}