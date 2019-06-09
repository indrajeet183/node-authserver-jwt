import passport from "passport";
import { addLeave, getLeaves, getAllLeaves, updateLeave, deleteLeave } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addLeave);

router.get("/", passport.authenticate("jwt", { session: false }), getLeaves);

router.get("/all", passport.authenticate("jwt", { session: false }), getAllLeaves);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateLeave);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteLeave);

export default router;
