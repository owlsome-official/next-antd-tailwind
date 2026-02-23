import NavBar from "components/NavBar";
import Head from "next/head";

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>REPLACE_WITH_YOUR_PROJECT_NAME</title>
        <meta
          name="description"
          content="REPLACE_WITH_YOUR_PROJECT_DESCRIPTION"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F1F0EC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="flex grow bg-background text-foreground">{children}</div>
    </>
  );
};

export default MainLayout;
