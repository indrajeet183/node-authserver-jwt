import passport from "passport";
import { addModuleAction, getModuleActions, updateModuleAction, deleteModuleAction, getModuleActionsById } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addModuleAction);

router.get("/", passport.authenticate("jwt", { session: false }), getModuleActions);

router.get("/:id", passport.authenticate("jwt", { session: false }), getModuleActionsById);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateModuleAction);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteModuleAction);

export default router;
