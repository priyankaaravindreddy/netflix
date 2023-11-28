import { NextResponse } from "next/server";
import connectToDB from "../../database";
import Movie from "../../models/movie";
import fs from "fs";
const filePath = "movies.json";
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
    // if (fs.existsSync(filePath)) {
    //   const fileData = fs.readFileSync(filePath, "utf-8");
    //   const movies = JSON.parse(fileData);

    //   return NextResponse.json(movies);
    // }
    // return NextResponse.json({});
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
      return NextResponse.json(allMovies);
    } else {
      console.log("Movies not found");
      return NextResponse.json({ message: "Movies not found" }, { status: 500 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}
