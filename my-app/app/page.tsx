"use client"; //The "use client" directive is a convention to declare a boundary between a Server and Client Component module graph.

import Title from "../components/Title";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import mySvg from "../images/undraw_updated_resume_re_7r9j.svg";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import SSXComponent from "@/components/SSXComponent";

export default function Home() {
  return (
    <div>
      <Layout>
        <Title />
        {/* <SSXComponent /> */}
      </Layout>
    </div>
  );
}
