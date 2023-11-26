import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
import fs from "fs";
const filePath = "data.json";

const serverAuth = async (credentials: { email: string; password: string }) => {
  console.log("fs.existsSync(filePath)", fs.existsSync(filePath));
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    console.log("fileData ", fileData);
    const jsonData = JSON.parse(fileData);
    console.log("jsonData", jsonData);
    // Filter the object based on email
    const currentUser = jsonData?.filter(
      ({
        email: eleEmail,
        hashedPassword: elePassword,
      }: {
        email: string;
        hashedPassword: string;
      }) => eleEmail === credentials?.email
    );
console.log("serverAuth ",currentUser, currentUser?.length > 0 ? currentUser?.[0] : {})
    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser?.length > 0 ? currentUser?.[0] : {};
  }
  return {};
};

export default serverAuth;
