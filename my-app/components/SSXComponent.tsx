"use client";
import { SSX } from "@spruceid/ssx";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import KeplerStorageComponent from "./KeplerStorageComponent";
import RebaseCredentialComponent from "../../RebaseCredentialComponent";
import SpruceKitCredentialComponent from "./SpruceKitCredentialComponent";
const SSXComponent = () => {
  const [ssxProvider, setSSX] = useState<SSX | null>(null);

  const ssxHandler = async () => {
    const ssx = new SSX({
      enableDaoLogin: true,
      resolveEns: {
        resolveOnServer: false,
        resolve: {
          domain: true,
          avatar: true,
        },
      },
      providers: {
        server: {
          host: "http://localhost:3000",
          routes: {
           
            login: "/api/auth/login",
            logout: "/api/auth/logout",
          },
        },
        web3: {
          driver: window.ethereum,
        },
      },
      modules: {
        storage: {
          prefix: "my-app",
          hosts: ["https://kepler.spruceid.xyz"],
          autoCreateNewOrbit: true,
        },
        credentials: true,
      },
    });
    await ssx.signIn();
    setSSX(ssx);
  };

  const ssxLogoutHandler = async () => {
    ssxProvider?.signOut();
    setSSX(null);
  };

  // ENS DATA
  const { domain, avatarUrl } = ssxProvider?.session()?.ens ?? {};

  // the address that is connected and signed in.
  const address = ssxProvider?.address() || "";

  return (
    <>
      {ssxProvider ? (
        <>
          <b>Avatar:</b> <code>{avatarUrl}</code>
          {/* <b>ENS Data:</b> <code>{domain}</code>
          <b>Avatar:</b> <code>{avatarUrl}</code>
          {address && (
            <p>
              <b>Ethereum Address:</b> <code>{address}</code>
            </p>
          )}
          <br />
          <button onClick={ssxLogoutHandler}>
            <span>Sign-Out</span>
          </button>
          <br />
          {/* <KeplerStorageComponent ssx={ssxProvider} />
            <br /> */}
          {/* <RebaseCredentialComponent ssx={ssxProvider} />
            <br /> */}
          {/* <SpruceKitCredentialComponent ssx={ssxProvider} /> */}
        </>
      ) : (
        <Button onClick={ssxHandler} id="sign-in_button" colorScheme="teal">
          <span>Connect wallet</span>
        </Button>
      )}
    </>
  );
};

export default SSXComponent;
