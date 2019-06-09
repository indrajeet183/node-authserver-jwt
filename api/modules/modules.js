import passport from "passport";
import { addModule, getModules, updateModule, deleteModule } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addModule);

router.get("/", passport.authenticate("jwt", { session: false }), getModules);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateModule);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteModule);

export default router;
