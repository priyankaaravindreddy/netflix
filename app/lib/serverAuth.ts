import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import fs from "fs";
const filePath = "data.json";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);
    console.log("jsonData", jsonData);
    // Filter the object based on email
    const currentUser = jsonData?.filter(
      ({
        email: eleEmail,
        password: elePassword,
      }: {
        email: string;
        password: string;
      }) => eleEmail === session?.user?.email
    );

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return { currentUser };
  }
  return null;
};

export default serverAuth;
