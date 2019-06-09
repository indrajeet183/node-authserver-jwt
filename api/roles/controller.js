import db from "../../storage/db";

export async function addRole(req, res) {
  const role = req.user.role;

  if (role === 1) {
    db.Roles.create({
      name: req.body.name
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          role: result
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

export async function getRoles(req, res) {
  const { role, id } = req.user;

  if (role === 1) {
    db.Roles.findAll()
      .then(roles => {
        res.status(200).json({
          status: "success",
          roles
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

export async function updateRole(req, res) {
  const { role } = req.user;
  const id = req.params.id;

  if (role === 1) {
    db.Roles.update(
      { name: req.body.name,updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(roles => {
        res.status(200).json({
          status: "success",
          roles
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

export async function deleteRole(req, res) {
  const { role } = req.user;
  const id = req.params.id;
  console.log(req.params);
  if (role === 1) {
    db.Roles.destroy({
      where: {
        id: id
      }
    })
      .then(roles => {
        res.status(200).json({
          status: "success",
          roles
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
