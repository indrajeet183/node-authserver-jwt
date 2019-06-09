import passport from "passport";
import { addRole, getRoles, updateRole, deleteRole } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addRole);

router.get("/", passport.authenticate("jwt", { session: false }), getRoles);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateRole);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteRole);

export default router;
