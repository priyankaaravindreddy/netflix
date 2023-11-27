import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/options";
import Navbar from "./components/Navbar";
import Billboard from "./components/Billboard";
import useMovieList from "./hooks/useMovieList";
import MovieList from "./components/MovieList";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const movies = await useMovieList();
  console.log("Home session", session);
  if (!session) {
    return redirect("/auth");
  }
  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        {/* <MovieList title="My List" data={favorites} /> */}
      </div>
    </div>
  );
};

export default Home;
