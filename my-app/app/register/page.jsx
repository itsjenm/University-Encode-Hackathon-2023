'use client'

import {
  Input,
  Flex,
  Heading,
  Button,
  Link,
  useColorMode,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
  ChakraProvider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

export default function Registration() {

  const [registration, setRegistration] = useState(null)

  return (
    <ChakraProvider>
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mt={[20, "5vh"]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        <Heading size="xs" padding="10px" paddingBottom="40px" textAlign='center'>
          Please register here if you don't have a wallet
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <Flex direction="column">
            <FormControl>
              <FormLabel>E-mail Address</FormLabel>
              <Input
                placeholder="test@gmail.com"
                variant="filled"
                mb={3}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="*************"
                variant="filled"
                mb={6}
                type="password"
              />
            </FormControl>
            <HStack w="full" justify="space-between" paddingBottom="20px">
              <Checkbox>Remember me.</Checkbox>
              <Button variant="link" colorScheme="teal">
                Forgot Password?
              </Button>
            </HStack>
            <Button colorScheme="teal" w={["full", "auto"]}>
              Register
            </Button>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}