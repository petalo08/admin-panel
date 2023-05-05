import { SidebarProvider } from '@/context/SidebarContext'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  )
}
