import db from "../../storage/db";

export async function addModuleAction(req, res) {
  const role = req.user.role;

  if (role === 1) {
    db.ModuleActions.create({
      name: req.body.name
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          moduleaction: result
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

export async function getModuleActions(req, res) {
  const { role, id } = req.user;

  if (role === 1) {
    db.ModuleActions.findAll({
      include: [
        {
          model: db.Modules,
          as: "Module"
        }
      ]
    })
      .then(moduleactions => {
        res.status(200).json({
          status: "success",
          moduleactions
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

export async function updateModuleAction(req, res) {
  const { role } = req.user;
  const id = req.params.id;

  if (role === 1) {
    db.ModuleActions.update(
      { name: req.body.name, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(moduleactions => {
        res.status(200).json({
          status: "success",
          moduleactions
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

export async function deleteModuleAction(req, res) {
  const { role } = req.user;
  const id = req.params.id;
  //console.log(req.params);
  if (role === 1) {
    db.ModuleActions.destroy({
      where: {
        id: id
      }
    })
      .then(moduleactions => {
        res.status(200).json({
          status: "success",
          moduleactions
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

export async function getModuleActionsById(req, res) {
  const { role } = req.user;
  console.log(req.user);
  const id = req.params.id;
  //console.log(req.params);
  if (role === 1) {
    db.ModuleActions.findAll({
      where: {
        module: id
      }
    })
      .then(moduleactions => {
        res.status(200).json({
          status: "success",
          moduleactions
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
