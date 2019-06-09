import db from "../../storage/db";
import moment from "moment";
const MODULE = "Timesheet";
import { Op } from "sequelize";

export async function addTimesheet(req, res) {
  const { role, roleactions, code } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.create`);

  if (haveAccess) {
    db.TimeSheet.create({
      jira_id: req.body.jira_id,
      emp_code: code,
      timesheet_date: req.body.timesheet_date,
      project_id: req.body.project_id,
      timesheet_hours: req.body.timesheet_hours,
      timesheet_comments: req.body.timesheet_comments
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          timesheet: result
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

export async function getTimesheets(req, res) {
  const { id, roleactions, code } = req.user;
  const { date } = req.params;
  console.log(req.user);
  const haveAccess = roleactions.includes(`${MODULE}.read`);
  if (haveAccess) {
    db.TimeSheet.findAll({
      where: {
        emp_code: code,
        timesheet_date: moment(date, "DD-MM-YYYY")
      },
      include: [{ model: db.Projects, as: "Project" }]
    })
      .then(timesheets => {
        res.status(200).json({
          status: "success",
          timesheets: timesheets
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

export async function updateTimesheet(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.edit`);
  if (haveAccess) {
    db.TimeSheet.update(
      { ...req.body, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(timesheet => {
        res.status(200).json({
          status: "success",
          timesheet
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

export async function deleteTimesheet(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.delete`);
  if (haveAccess) {
    db.TimeSheet.destroy({
      where: {
        id: id
      }
    })
      .then(timesheet => {
        res.status(200).json({
          status: "success",
          timesheet
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

export async function getJiraIds(req, res) {
  const { isAdmin } = req.user;

  if (isAdmin) {
    db.TimeSheet.findAll({
      attributes: ["jira_id"],
      group: ["jira_id"]
    })
      .then(jiras => {
        res.status(200).json({
          status: "success",
          jiras
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    console.log("ala");
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function getFiltered(req, res) {
  const { isAdmin } = req.user;
  const { emp_codes, project_ids, jira_ids, from_date, to_date } = req.body;

  let where = {};
  emp_codes && emp_codes.length
    ? (where.emp_code = { [Op.in]: emp_codes ? emp_codes : [] })
    : where;
  project_ids && project_ids.length
    ? (where.project_id = { [Op.in]: project_ids ? project_ids : [] })
    : where;
  jira_ids && jira_ids.length ? (where.jira_id = { [Op.in]: jira_ids ? jira_ids : [] }) : where;

  from_date && to_date
    ? (where.timesheet_date = {
        [Op.between]: [from_date, to_date]
      })
    : where;

  if (isAdmin) {
    db.TimeSheet.findAll({
      where,
      include:[
        {model: db.Employee, as:'Employee'},
        {model: db.Projects, as:'Project'}
      ]
    })
      .then(timesheet => {
        res.status(200).json({
          status: "success",
          timesheet
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  } else {
    console.log("ala");
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}
