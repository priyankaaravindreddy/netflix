import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectToDB from "../../database";
import User from "../../models/user"
const filePath = "data.json";
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
  await connectToDB();
  const userData = await req.json();
  try {
    // console.log("fsexists ",fs.existsSync(filePath))
    // if (fs.existsSync(filePath)) {
    //   const fileData = fs.readFileSync(filePath, "utf-8");
    //   const jsonData = JSON.parse(fileData);
    //   // Filter the object based on email
    //   const existingUser = jsonData?.filter(
    //     ({ email: eleemail }: { email: string }) => eleemail === email
    //   );
    //   if (existingUser.length > 0) {
    //     return NextResponse.json({ error: "Email taken" });
    //   }
    //   const hashedPassword = await bcrypt.hash(password, 12);
    //   fs.writeFileSync(
    //     "data.json",
    //     JSON.stringify([...jsonData, { email, name, hashedPassword }])
    //   );
    //   return NextResponse.json({ success: true });
    // } else {
    //   console.log("in else of register")
    //   const hashedPassword = await bcrypt.hash(password, 12);
    //   fs.writeFileSync(
    //     "data.json",
    //     JSON.stringify([{ email, name, hashedPassword }])
    //   );
    //   const filedata=fs.readFileSync(filePath, "utf-8")
    //   console.log("filedata ", JSON.parse(filedata))
    //   return NextResponse.json({ success: "hi" });
    // }

    // check for duplicate emails
  
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}
