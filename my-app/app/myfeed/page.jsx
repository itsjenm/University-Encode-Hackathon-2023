"use client";

import { ChakraProvider, Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Navigation from "../../components/Navigation";

const MyFeed = () => {
  return (
    <ChakraProvider>
      <Container textAlign="center">
        <Navigation />
      </Container>
    </ChakraProvider>
  );
};

export default MyFeed;
