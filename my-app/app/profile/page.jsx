"use client";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from "../../components/Loading";
import {
  Container,
  VStack,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Button,
 
} from "@chakra-ui/react";
import style from "../page.module.css";
import Register from "../register/page";
import Navigation from "../../components/Navigation";
const { ethers } = require("ethers");
import { useState } from "react";
import { SSX } from "@spruceid/ssx";


function Profile() {
  // access the authentication state
  const { user, isLoading } = useUser();

  const [ssxProvider, setSSX] = useState(SSX | null);
  const [name, setName] = useState();
  const [picture, setPicture] = useState();
  const [bio, setBio] = useState();
  const [newData, setNewData] = useState();
  const [address, setAddress] = useState();


  // initializing a SSX instance with the storage enabled
  const signInButtonHandler = async () => {
    const ssx = new SSX({
      resolveEns: {
        resolveOnServer: false,
        resolve: {
          domain: true,
          avatar: true,
        },
      },
      providers: {
        web3: {
          driver: window.ethereum,
        },

        siweConfig: {
          statement: "Sign in to use our service today!",
          requestId: "/updatedProfile",
        },
      },
      modules: {
        storage: {
          prefix: "my-app",
          hosts: ["https://kepler.spruceid.xyz"],
          autoCreateNewOrbit: true,
        },
      },
    });
    const session = await ssx.signIn();
    setSSX(session);

    const formatedKey = "/profile";
    await ssx.storage.put(formatedKey,  bio);
    setAddress((prevList) => [...prevList, `my-app/${formatedKey}`]);
    console.log(formatedKey)
    
  };

  const DEFAULT_ACCOUNT_AVATAR =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg";

  // handle button submit
  const handleSubmit = async (name, bio) => {
    const formatedKey = "content/" + name;
    const newData = await ssx.storage.put(formatedKey, bio);
    setNewData(newData);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Navigation />
      {user && (
        <>
          <Box
            w={["lg"]}
            p={[8, 10]}
            mt={[20, "10vh"]}
            mx="auto"
            border={["none", "1px"]}
            borderColor={["", "gray.300"]}
            borderRadius={10}
          >
            <Flex alignItems="center" justifyContent="center">
              <Flex direction="column">
                <Heading
                  size="lg"
                  padding="10px"
                  paddingBottom="40px"
                  textAlign="center"
                >
                  Your Profile
                </Heading>
                <Container padding="3" centerContent>
                  <img
                    src={DEFAULT_ACCOUNT_AVATAR}
                    alt="Profile"
                    width="200"
                    height="200"
                    className={style.avatar_profile}
                  />
                </Container>

                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="0x****"
                    value={name}
                    variant="filled"
                    mb={3}
                    type="name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Avatar URL</FormLabel>
                  <Input
                    placeholder="*************"
                    variant="filled"
                    value={picture}
                    mb={6}
                    type="id"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    placeholder="Bio here..."
                    variant="filled"
                    mb={6}
                    type="textarea"
                    value={bio}
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  onClick={() => signInButtonHandler(name, bio)}
                >
                  Save Changes
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box>
            {name}
            {address}
            {bio}
          </Box>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
