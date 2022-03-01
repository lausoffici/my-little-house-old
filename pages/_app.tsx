import { ChakraProvider, Container } from "@chakra-ui/react";

// Entry point de la app (logica que comparten todas las pages)
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container maxW="container.lg">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
