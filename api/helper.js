import db from "../storage/db";

export const hasAccess = (role, module, action) => {
  return db.RolesActions.findAll({
    where: {
      role_id: role,
      action: action
    },
    include: [
      {
        model: db.Modules,
        where: { name: module },
        as: "Modules"
      }
    ]
  })
    .then(roleAction => {        
      return roleAction.length
    })
    .catch(err => {
      //console.log(err);
      return false;
    });
};
