'use client'

import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

const Contact = () => {
  return (
    <ChakraProvider>
      <Container textAlign='center'>
        <Heading>
            Contact us
        </Heading>
      </Container>
    </ChakraProvider>
  );
};

export default Contact;
