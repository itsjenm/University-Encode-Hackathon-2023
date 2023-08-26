// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import themes from './theme';
import { UserProvider } from "@auth0/nextjs-auth0/client";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={themes.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
