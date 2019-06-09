import passport from "passport";
import { addRoleAction, getRoleActions, updateRoleAction, deleteRoleAction, getRolesAndModules } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addRoleAction);

router.get("/", passport.authenticate("jwt", { session: false }), getRolesAndModules);

router.get("/all", passport.authenticate("jwt", { session: false }), getRoleActions);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateRoleAction);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteRoleAction);

export default router;
