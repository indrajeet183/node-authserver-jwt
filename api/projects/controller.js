import db from "../../storage/db";
const MODULE = "Projects";

export async function addProject(req, res) {
  const { role, roleactions } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.create`);
  if (haveAccess) {
    db.Projects.create({
      name: req.body.name
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          project: result
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

export async function getProjects(req, res) {
  const { role, id, roleactions } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.read`);
  if (haveAccess) {
    db.Projects.findAll({
      attributes:['id', 'project_name']
    })
      .then(projects => {
        res.status(200).json({
          status: "success",
          projects
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

export async function updateProject(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.edit`);
  if (haveAccess) {
    db.Projects.update(
      { name: req.body.name, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(projects => {
        res.status(200).json({
          status: "success",
          projects
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

export async function deleteProject(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.delete`);
  console.log(req.params);
  if (haveAccess) {
    db.Projects.destroy({
      where: {
        id: id
      }
    })
      .then(projects => {
        res.status(200).json({
          status: "success",
          projects
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
