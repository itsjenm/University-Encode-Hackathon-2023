'use client'

import { ChakraProvider, Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const About = () => {
  return (
    <ChakraProvider>
      <Container textAlign='center'>
        <Heading>About us</Heading>
      </Container>
    </ChakraProvider>
  );
};

export default About;
