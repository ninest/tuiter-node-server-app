import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import HelloController from "./controllers/hello-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import UserController from "./users/users-controller.js";
import mongoose from "mongoose";

const app = express();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";
mongoose.connect(CONNECTION_STRING);

console.log("Allowed origin: ", process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
app.use(function (req, res, next) {
  console.log(`\n[SESSION] ${JSON.stringify(req.session['currentUser'])}\n`)
  return next()
})

AuthController(app);
TuitsController(app);
HelloController(app);
UserController(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on http://localhost:4000");
});
