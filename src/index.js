import dotenv from "dotenv";
import connectionToDb from "./db/database.js";
import { app } from "./app.js";

dotenv.config();

connectionToDb()
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Connected to database on port: `, process.env.PORT || 5000);
    }),
    app.on("error", (error) => {
      console.error("Error: ", error);
    })
  )
  .catch((error) => {
    console.log(`DB connection fialed:`, error);
  });
