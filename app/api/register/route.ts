import bcrypt from 'bcryptjs';
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
      // Filter the object based on email
      const existingUser = jsonData?.filter(
        ({ email: eleemail }: { email: string }) => eleemail === email
      );
      if (existingUser.length > 0) {
        return NextResponse.json({ error: "Email taken" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      fs.writeFileSync(
        "data.json",
        JSON.stringify([...jsonData, { email, name, hashedPassword }])
      );
      return NextResponse.json({ success: true });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      fs.writeFileSync(
        "data.json",
        JSON.stringify([{ email, name, hashedPassword }])
      );
      return NextResponse.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ success: "hello" });
}
