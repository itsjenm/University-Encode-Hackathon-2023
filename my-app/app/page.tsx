"use client"; //The "use client" directive is a convention to declare a boundary between a Server and Client Component module graph.

import Title from "../components/Title";
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'


export default function Home() {
  return (
    <div>
      <Layout>
        <Title />
        <Dashboard />
      </Layout>
    </div>
  );
}
