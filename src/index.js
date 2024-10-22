import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./db/index.js";
import { app } from "./app.js";

connectToDB()?.then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is listening at ", process.env.PORT);
  });
});
