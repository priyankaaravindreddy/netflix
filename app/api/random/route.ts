import { NextResponse } from "next/server";
import fs from "fs";
const filePath = "movies.json";
export async function GET(req:Request) {
    console.log("")
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const movies = JSON.parse(fileData);
      const randomIndex = Math.floor(Math.random() * movies?.length);

      return NextResponse.json(movies[randomIndex]);
    }
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
