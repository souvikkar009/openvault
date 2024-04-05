"use client";

import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      1: "#1A202C",
      2: "#81E6D9",
      3: "#EDF2F7",
      4: "#A0AEC0",
      5: "#2d3748",
    },
  },
});

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
