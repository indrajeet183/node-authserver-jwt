import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import hookJWTStrategy from "./middleware/passport";
import db from "./storage/db";
import Api from "./api";


const PORT = process.env.PORT || 5000;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  next();
});
app.use(passport.initialize());
// Hook the passport JWT strategy.
hookJWTStrategy(passport);
app.use(bodyParser.json());
app.use(Api);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
