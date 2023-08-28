"use client";

import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import Navigation from "../../components/Navigation";

const Contact = () => {
  return (
    <ChakraProvider>
      <Container textAlign="center" margin="300px">
        <Navigation />
      </Container>
    </ChakraProvider>
  );
};

export default Contact;
