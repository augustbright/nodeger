import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { API } from "../../shared/const";

export const useSetCurrentNVMVersion = () => {
    const toast = useToast();
    const client = useQueryClient();

    return async (version: string) => {
        const { error } = await api.nvm.use(version);

        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error'
            });
            return;
        }

        client.invalidateQueries(API.NVM.LS_LOCAL);
    }
};