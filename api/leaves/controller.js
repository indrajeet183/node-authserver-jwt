import db from "../../storage/db";
const module = "leaves";

export const addLeaves = (req, res) => {
  const role = req.user.role;  
  db.Modules.findOne({
    where: { name: module }
  })
    .then(module => {
      if (hasAccess(role, module, "create")) {
        res.status(200).json(req.user);
      } 
    })
    .catch(err => {
      res.status(404).json("You don't have access to add leave");
    });
};
