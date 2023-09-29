import { useMutation, useQueryClient } from "react-query";
import { API } from "../../shared/const";
import { useToast } from "@chakra-ui/react";

export const useInstallVersion = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async (version: TNodeVersion) => {
            const result = await api.nvm.install(version.id);
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: (_data, version) => {
            queryClient.invalidateQueries(API.NVM.LS_LOCAL);
            queryClient.invalidateQueries(API.NVM.LS_REMOTE);
            toast({
                title: `Node ${version.id} installed.`,
                status: 'success',
                isClosable: true,
            });
        },
        onError(_error, variables) {
            toast({
                title: `Node ${variables.id} failed to install.`,
                status: 'error',
                isClosable: true,
            });        
        },
    });
};