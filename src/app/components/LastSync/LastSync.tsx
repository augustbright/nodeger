import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useLastSyncTime } from "../../hooks/useLastSyncTime";
import { useNVMVersions } from "../../hooks/useNVMVersions";
import { useSyncVersions } from "../../hooks/useSyncVersions";
import { RepeatIcon } from "@chakra-ui/icons";
import { DotLoader } from "../DotLoader/DotLoader";

export const LastSync = () => {
    const { data, error } = useLastSyncTime();
    const { isFetching: isFetchingVersions } = useNVMVersions();
    const { mutate: sync, isLoading: isSyncing } = useSyncVersions();

    let content: React.ReactNode = (
        <>
            <Text fontSize='xs' lineHeight='32px'>
                Last sync was at:
            </Text>
            {
                (isSyncing || isFetchingVersions) ? (
                    <DotLoader />
                ) : (
                    <Text fontSize='xs' lineHeight='32px'> {data} </Text>                    
                )
            }
        </>
    )

    if (error) {
        content = <Text color='red.500'>
            Couldn't fetch last sync time
        </Text>;
    }

    if (!data) {
        content = null;
    }

    return <Flex alignItems='center' gap={3}>
        <IconButton
            size="sm"
            bg="transparent"
            aria-label='Update'
            icon={<RepeatIcon />}
            isLoading={isSyncing || isFetchingVersions}
            onClick={(e) => {
                e.stopPropagation();
                if (!isSyncing) sync();
            }}
        />
        {content}
    </Flex>;
};