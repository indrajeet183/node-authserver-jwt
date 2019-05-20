import passport from "passport";
import { addLeaves } from './controller';

const express = require("express"),
  router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addLeaves
);

export default router;
