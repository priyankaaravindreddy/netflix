import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(
     "mongodb+srv://priyankaaravindreddy:HAel4GgURkSbvAEI@cluster0.y0zq20h.mongodb.net/AppDB"
    );
    console.log("mongodb is connected");
  } catch (e) {
    console.log(e);
  }
};

export default connectToDB;