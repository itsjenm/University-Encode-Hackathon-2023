"use client";

import React from "react";
import { useState } from "react";
import { Heading, Box, Button, Container, Highlight } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import wave from "../images/icons8-waving-hand-medium-skin-tone-96.png";
import SSXComponent from "./SSXComponent";
import { Spinner } from "@chakra-ui/react";

export default function Title() {
  const { user, error, isLoading } = useUser();
  if (isLoading)
    return (
      <div>
        <Spinner color="teal.300" thickness="4px" />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {!user ? (
        <Box mt="40" w="100%">
          <Heading mb={4} alignContent="center" lineHeight='tall'>
            <Highlight
              query={["recommendations, notes, job referrences"]}
              styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
            >
              Store your recommendations, notes, and job referrences in one
              place!
            </Highlight>
          </Heading>
          <a href="/api/auth/login">Login</a>
        </Box>
      ) : (
        <>
          <Box mt="40" w="100%">
            <Heading
              alignContent="center"
              display="flex"
              justifyContent="center"
            >
              Welcome
              <Box
                display="flex"
                justifyContent="center"
                width="80px"
                height="auto"
                paddingLeft="20px"
              >
                <Image src={wave} alt="waving hand emoji" />
              </Box>
              !
            </Heading>
            <h2>{user.nickname}</h2>
          </Box>
          <SSXComponent />
        </>
      )}
    </div>
  );
}
