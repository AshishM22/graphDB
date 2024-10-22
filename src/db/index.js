import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const mongooseInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connection successfull");
  } catch (err) {
    console.log("Database connection failed", err);
    throw new Error(err);
  }
};

export default connectToDB;
