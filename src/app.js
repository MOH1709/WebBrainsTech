import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

//-----------------------------------------------> custom
import "./helpers/init_mongodb.js";
import { verifyAccessToken } from "./helpers/jwt_helper.js";
import * as router from "./routes/index.js";


//-----------------------------------------------> using imports
const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // temp allow localhost 3000
app.use(morgan("dev")); // check request response status on console
app.use(express.json()); // to convert all post request into json format

//-----------------------------------------------> using routes
app.use("/api/manager", router.manager);
app.use("/api/employee", verifyAccessToken, router.employee);

// app.use("/", verifyAccessToken, (req, res) => {
//   res.send("Mohit");
// })

//-----------------------------------------------> handle error
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});

// //-----------------------------------------------> check for heroku
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });
// }

//-----------------------------------------------> adding listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
});
