import passport from "passport";
import { addTimesheet, getTimesheets, updateTimesheet, deleteTimesheet, getJiraIds, getFiltered } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addTimesheet);

router.get("/jiras",passport.authenticate("jwt", { session: false }), getJiraIds);

router.get("/:date?", passport.authenticate("jwt", { session: false }), getTimesheets);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateTimesheet);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteTimesheet);

router.get("/jiras",passport.authenticate("jwt", { session: false }), getJiraIds);

router.post("/filtered",passport.authenticate("jwt", { session: false }), getFiltered);

export default router;
