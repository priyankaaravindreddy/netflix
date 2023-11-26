import React from "react"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from './components/Navbar';
import Billboard from "./components/Billboard";
import useMovieList from './hooks/useMovieList';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const   movies  = useMovieList();
  console.log("Home session",session)
  if (!session) {
    return redirect("/auth")
  }
  return (
    <div>
      <Navbar/>
      <Billboard/>
    </div>
  );
};

export default Home;
