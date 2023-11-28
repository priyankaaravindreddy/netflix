import { NextResponse } from "next/server";
import connectToDB from "../../database";
import Movie from "../../models/movie";
import fs from "fs";
const filePath = "movies.json";
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
  await connectToDB();
  // try {
  //   if (fs.existsSync(filePath)) {
  //     const fileData = fs.readFileSync(filePath, "utf-8");
  //     const movies = JSON.parse(fileData);
  //     const randomIndex = Math.floor(Math.random() * movies?.length);

  //     return NextResponse.json(movies[randomIndex]);
  //   }
  //   return NextResponse.json({});
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.json({});
  // }
  try {
    //   const moviesCount = await Movie.countDocuments();
    //   console.log("movieCount ",moviesCount)
    // const randomIndex = Math.floor(Math.random() * moviesCount);

    const allMovies = await Movie.find();
    if (allMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMovies.length || 0);
      console.log("Found movie:", allMovies[randomIndex]);
      return NextResponse.json(allMovies[randomIndex]);
    } else {
      console.log("Movie not found");
      return NextResponse.json({ message: "Movie not found" }, { status: 500 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}
