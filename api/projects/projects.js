import passport from "passport";
import { addProject, getProjects, updateProject, deleteProject } from "./controller";

const express = require("express"),
  router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addProject);

router.get("/", passport.authenticate("jwt", { session: false }), getProjects);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateProject);

router.delete("/:id",passport.authenticate("jwt", { session: false }), deleteProject);

export default router;
