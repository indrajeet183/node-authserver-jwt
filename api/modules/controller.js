import db from "../../storage/db";

export async function addModule(req, res) {
  const role = req.user.role;

  if (role === 1) {
    db.Modules.create({
      name: req.body.name
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          module: result
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

export async function getModules(req, res) {
  const { role, id } = req.user;

  if (role === 1) {
    db.Modules.findAll()
      .then(modules => {
        res.status(200).json({
          status: "success",
          modules
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

export async function updateModule(req, res) {
  const { role } = req.user;
  const id = req.params.id;

  if (role === 1) {
    db.Modules.update(
      { name: req.body.name,updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(modules => {
        res.status(200).json({
          status: "success",
          modules
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

export async function deleteModule(req, res) {
  const { role } = req.user;
  const id = req.params.id;
  console.log(req.params);
  if (role === 1) {
    db.Modules.destroy({
      where: {
        id: id
      }
    })
      .then(modules => {
        res.status(200).json({
          status: "success",
          modules
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
