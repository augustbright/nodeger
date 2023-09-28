import { Flex, SkeletonText, Text } from "@chakra-ui/react";
import { useLastSyncTime } from "../../hooks/useLastSyncTime";
import { useIsMutating } from "react-query";
import { API } from "../../../shared/const";

export const LastSync = () => {
    const { data, isFetching, error } = useLastSyncTime();
    const isSyncing = useIsMutating({ mutationKey: API.NVM.SYNC });

    if (error) {
        return <Text color='red.500'>
            Couldn't fetch last sync time
        </Text>;
    }

    if (!data) {
        return null;
    }

    return <Flex alignItems='center' gap={3}>
        <Text fontSize='xs' lineHeight='32px'>
            Last sync:
        </Text>
        {
            (isFetching || isSyncing)
                ? <SkeletonText w='120px' noOfLines={1} />
                : <Text fontSize='xs' lineHeight='32px'> {data} </Text>
        }
    </Flex>;
};