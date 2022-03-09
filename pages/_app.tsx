import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "components/Sidebar";
import theme from "../theme";
import "../theme/styles.css";

// Entry point de la app (logica que comparten todas las pages)
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh">
        <Sidebar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
