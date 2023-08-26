"use client";

import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  color,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import SSXComponent from "@/components/SSXComponent";
import { useUser } from "@auth0/nextjs-auth0/client";

// Dark mode and nav items

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { user, error, isLoading } = useUser();
  const [display, changeDisplay] = useState("none");

  return (
    <Flex>
      {/* profile button  */}
      {/* <Flex position="fixed" top="1rem" align="center">
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex> */}
      <Flex position="fixed" top="1rem" left="5rem" align="center">
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]} paddingRight="20px">
          <NextLink href="/" passHref>
            <Button
              variant="link"
              aria-label="Home"
              my={5}
              w="100%"
              paddingRight="20"
            >
              Home
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button
              variant="link"
              aria-label="About"
              my={5}
              w="100%"
              paddingRight="20"
            >
              About
            </Button>
          </NextLink>
          <NextLink href="/resources" passHref>
            <Button
              variant="link"
              aria-label="Resources"
              my={5}
              w="100%"
              paddingRight="20"
            >
              Resources
            </Button>
          </NextLink>
          <NextLink href="/contact" passHref>
            <Button
              variant="link"
              aria-label="Contact"
              my={5}
              w="100%"
              paddingRight="10"
            >
              Contact
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      {/* mobile */}
      {/* top right navigation with connect wallet button + toggle Button  */}
      <Flex
        position="fixed"
        top="2rem"
        right="2rem"
        display={["none", "none", "flex", "flex"]}
      >
        {/* box for right side navigation */}
        <Box paddingRight="30px" textAlign="center">
          {/* connect wallet logic  if user is not logged in */}
          {!user && (
            <NextLink href="/api/auth/login" passHref>
              <Button id="sign-in_button" colorScheme="teal">
                <span>Connect wallet</span>
              </Button>
            </NextLink>
          )}
          {user && (
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="nav-user-profile rounded-circle"
                  width="40"
                  height="40"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={Button}>
                  <NextLink href="/profile" icon="user">
                    Profile
                  </NextLink>
                </MenuItem>
                <MenuItem as={Button}>
                  <NextLink href="/api/auth/logout" passHref>
                    Logout
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>

        <Switch
          color="green"
          isChecked={isDark}
          onChange={toggleColorMode}
          alignContent="center"
        />
      </Flex>
      <IconButton
        aria-label="Open Menu"
        size="lg"
        mr={2}
        icon={<HamburgerIcon />}
        onClick={() => changeDisplay("flex")}
        display={["flex", "flex", "none", "none"]}
      />

      {/* mobile content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        color="black"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
            color="black"
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <NextLink href="/" passHref>
            <Button aria-label="Home" my={5} w="100%" color="black">
              Home
            </Button>
          </NextLink>

          <NextLink href="/about" passHref>
            <Button aria-label="About" my={5} w="100%" color="black">
              About
            </Button>
          </NextLink>

          <NextLink href="/contact" passHref>
            <Button aria-label="Contact" my={5} w="100%" color="black">
              Contact
            </Button>
          </NextLink>
          <SSXComponent />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DarkModeSwitch;
