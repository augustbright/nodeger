import { Box } from "@chakra-ui/react"

export const Page = ({ children }: {
    children: React.ReactNode
}) => {
    return <Box px={2} h='100%'>
        {children}
    </Box>
}