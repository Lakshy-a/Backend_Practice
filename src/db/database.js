import mongoose from "mongoose";

const connectionToDb = async () => {
  try {
    const dbInstance = await mongoose.connect(
      `${process.env.MONGO_URI}${process.env.DB_NAME}`
    );
    console.log(`Connected to MongoDB`, dbInstance.connection.host);
  } catch (error) {
    console.log(`Error while connecting to db: `, error);
  }
};

export default connectionToDb;
