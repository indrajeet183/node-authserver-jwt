import db from "../storage/db";

export const hasAccess = (module, role, action) => {
  db.RolesActions.findAll({
      where: {
          role_id: role,
          module_id: module,
          action: action
      }
  })
    .then(roleAction => {
      return true;
    })
    .catch(err => {
      return false
    });
};
