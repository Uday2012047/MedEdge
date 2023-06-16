// Home Page
import Head from "next/head";
import { useSession, signIn, getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/profile");
    }
  }, []);
  return (
    <div className="bold h-screen w-screen bg-red-500">
      <div className=" bg-slate-500 items-center justify-center">Hello World
      <button className="bg-blue-300 text-black justify-center  ml-40 items-center border rounded-md flex" onClick={() => signIn()} >Sign in</button>
     
      </div>
    </div>

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
