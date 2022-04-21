import Myprojects from "@components/Projects/MyProjects";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Systamate - Home</title>
      </Head>
      <Myprojects />
    </>
  );
};

export default HomePage;
