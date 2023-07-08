import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import CreateBlank from "../components/CreateBlank";
import RecentFiles from "../components/RecentFiles";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";

import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Google Docs</title>
        <meta name="description" content="Google Docs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {session ? (
        <div>
          <Header />
          <CreateBlank />
          <RecentFiles />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
