import fs from "fs";
const filePath = "data.json";

const serverAuth = async (credentials: { email: string; password: string }) => {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);
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
    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser?.length > 0 ? currentUser?.[0] : {};
  }
  return {};
};

export default serverAuth;
