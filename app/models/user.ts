import mongoose, { Schema, Document, Model } from "mongoose";
interface User  {

  email: string;
  password: string;
};

interface UserDocument extends Document, User {}

interface UserModel extends Model<UserDocument> {}
const userSchema = new Schema<UserDocument, UserModel>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // ... other fields
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
export type { UserModel, UserDocument };
