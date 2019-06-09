import db from "../../storage/db";

export async function addRoleAction(req, res) {
  const role = req.user.role;

  if (role === 1) {
    db.RoleActions.create({
      name: req.body.name
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          roleaction: result
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    res.status(403).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function getRoleActions(req, res) {
  const { role, id } = req.user;

  if (role === 1) {
    db.RolesActions.findAll({
      attributes: [
        "id",
        "Modules.name",
        "Roles.name",
        "action",
        "created_at",
        "updated_at"
      ],
      include: [
        {
          model: db.Roles,
          as: "Roles",          
        },
        {
          model: db.Modules,
          as: "Modules",        
        }
      ]
    })
      .then(roleactions => {
        const mappedRoleactions = roleactions.map(e => {          
          return {
            action: e.action,
            created_at: e.created_at,
            updated_at: e.updated_at,
            id:e.id,
            role:e.Roles?{name:e.Roles.name,id:e.Roles.id}:'',
            module:e.Modules?{name:e.Modules.name,id:e.Modules.id}:''            
          }
        })
        res.status(200).json({
          status: "success",
          roleactions: mappedRoleactions
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function updateRoleAction(req, res) {
  const { role } = req.user;
  const id = req.params.id;

  if (role === 1) {
    db.RoleActions.update(
      { name: req.body.name, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(roleactions => {
        res.status(200).json({
          status: "success",
          roleactions
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function deleteRoleAction(req, res) {
  const { role } = req.user;
  const id = req.params.id;
  console.log(req.params);
  if (role === 1) {
    db.RoleActions.destroy({
      where: {
        id: id
      }
    })
      .then(roleactions => {
        res.status(200).json({
          status: "success",
          roleactions
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function getRolesAndModules(req, res) {
  const { role } = req.user;
  const id = req.params.id;
  console.log(req.params);
  if (role === 1) {
    db.Roles.findAll()
      .then(roles => {
        db.Modules.findAll()
          .then(modules => {
            res.status(200).json({
              status: "success",
              data: { roles, modules }
            });
          })
          .catch(err => {
            res.status(404).json({
              status: "failed",
              msg: err
            });
          });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}
