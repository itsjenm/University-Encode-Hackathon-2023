'use client'

import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

const Resources = () => {
  return (
    <ChakraProvider>
      <Container textAlign='center'>
        <Heading>
            Check out these resources
        </Heading>
      </Container>
    </ChakraProvider>
  );
};

export default Resources;