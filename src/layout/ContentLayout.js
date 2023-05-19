import { SidebarContext } from '@/context/SidebarContext'
import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'

function ContentLayout({ children, ...props }) {

    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext)
    return (
        <Box
            p={5}
            w={isCollapsed ? '100%' : '85vw'}
            h='95vh'
            bg={'white'}
            __css={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                    bg: 'gray.100',
                },
                '&::-webkit-scrollbar-thumb': {
                    bg: 'gray.300',
                    borderRadius: '24px',
                },
            }}
        >
            {children}
        </Box>
    )
}

export default ContentLayout