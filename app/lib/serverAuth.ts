import fs from "fs";
const filePath = "data.json";
import connectToDB from "../database";
import User from "../models/user";
import { NextResponse } from "next/server";

const serverAuth = async (credentials: { credEmail: string; password: string }) => {
  // if (fs.existsSync(filePath)) {
  //   const fileData = fs.readFileSync(filePath, "utf-8");
  //   const jsonData = JSON.parse(fileData);
  //   // Filter the object based on email
  //   const currentUser = jsonData?.filter(
  //     ({
  //       email: eleEmail,
  //       hashedPassword: elePassword,
  //     }: {
  //       email: string;
  //       hashedPassword: string;
  //     }) => eleEmail === credentials?.email
  //   );
  //   if (!currentUser) {
  //     throw new Error("Not signed in");
  //   }

  //   return currentUser?.length > 0 ? currentUser?.[0] : {};
  // } else {
  //   try {
  //     const response = await fetch("/.netlify/functions/fetchData");
  //     const jsonData = await response.json();
  //     console.log("jsonData ", jsonData);
  //     const currentUser = jsonData?.filter(
  //       ({
  //         email: eleEmail,
  //         hashedPassword: elePassword,
  //       }: {
  //         email: string;
  //         hashedPassword: string;
  //       }) => eleEmail === credentials?.email
  //     );
  //     if (!currentUser) {
  //       throw new Error("Not signed in");
  //     }
  //     return currentUser?.[0] || {};
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  // return {};
  await connectToDB();
  try {
    const currentUser = await User.findOne({ email : credentials.credEmail })
      .lean()
      .exec();

    return currentUser || {}
  } catch (e) {
    console.log(e);
    return {}
  }
};

export default serverAuth;
