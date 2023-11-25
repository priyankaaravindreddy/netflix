import { NextResponse } from "next/server";
import fs from "fs";
const filePath = "data.json";
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }

  const { email, name, password } = await req.json();
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileData);
      console.log("jsonData", jsonData);
      // Filter the object based on email
      const existingUser = jsonData?.filter(
        ({
          email: eleEmail,
          password: elePassword,
        }: {
          email: string;
          password: string;
        }) => eleEmail === email && elePassword === password
      );
      if (existingUser) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "User doesn't exists" });
      }
    } else {
      return NextResponse.json({ error: "User doesn't exists" });
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ success: "Use found" });
}
