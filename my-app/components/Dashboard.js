import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ChakraProvider, Grid, Card, Link } from "@chakra-ui/react";
import { SSX } from "@spruceid/ssx";
import RebaseCredentialComponent from "./RebaseCredentialComponent";
import SpruceKitCredentialComponent from "./SpruceKitCredentialComponent";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const signInButtonHandler = async () => {
    const ssx = new SSX();
    const session = await ssx.signIn();
  };

  // const fetchProfile = async = () => {
  //   if (!ssx)
  // }

  if (user) {
    return (
      <ChakraProvider>
        <Grid container spacing="1rem">
          
        </Grid>
      </ChakraProvider>
    );
  }
  return <a href="/api/auth/login">Login</a>;
};

export default Dashboard;
