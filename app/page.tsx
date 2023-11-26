import React from "react"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from './components/Navbar';

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log("Home session",session)
  if (!session) {
    return <p>Redirecting....</p>
  }
  return (
    <div>
      <Navbar/>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Home;
