import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_LOCAL)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });