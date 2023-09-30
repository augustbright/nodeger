import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { API } from "../../shared/const";
import { getErrorMessage } from "../func/getErrorMessage";

export const useSetCurrentNVMVersion = () => {
    const toast = useToast();
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (version: string) => {
            const response = await api.nvm.use(version);

            if (response.error) {
                throw new Error(response.error);
            }
        },
        onSuccess: (_data, version) => {
            toast({
                title: 'Success',
                description: `Switched to version ${version}`,
                status: 'success'
            });
            client.invalidateQueries(API.NVM.LS_LOCAL);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: getErrorMessage(error),
                status: 'error'
            });
        }
    });
};