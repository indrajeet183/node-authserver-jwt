import express from 'express'
import bodyParser from 'body-parser'
import passport from "passport";
import hookJWTStrategy from "./middleware/passport" 
import db from './storage/db'
import Api from './api'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(passport.initialize());
// Hook the passport JWT strategy.
hookJWTStrategy(passport);
app.use(bodyParser.json());
app.use(Api);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
