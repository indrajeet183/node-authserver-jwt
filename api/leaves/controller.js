import { hasAccess } from "../helper";
import db from "../../storage/db";
const MODULE = "Leaves";

export async function addLeave(req, res) {
  const { role, roleactions, id } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.create`);  

  if (haveAccess) {
    db.LeaveTransactions.create({
      type: req.body.type,
      Eid: req.user.id,
      from_date: req.body.from_date,
      to_date: req.body.to_date,
      leave_title: req.body.leave_title,
      leave_cc: req.body.leave_cc ? req.body.leave_cc : null,
      leave_bcc: req.body.leave_bcc ? req.body.leave_bcc : null,
      hr_respone: req.body.hr_respone ? req.body.hr_respone : null,
      reason: req.body.reason ? req.body.reason : null
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          leave: result
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

export async function getLeaves(req, res) {
  const { id, roleactions } = req.user;   
  console.log(req.user);
  const haveAccess = roleactions.includes(`${MODULE}.read`);  
  if (haveAccess) {
    db.LeaveTransactions.findAll({
      where: {
        Eid: id
      },
      attributes: [
        "id",
        "type",
        "status",
        "post_date",
        "from_date",
        "to_date",
        "leave_title",
        "reason"
      ]
    })
      .then(leaves => {
        res.status(200).json({
          status: "success",
          leaves: leaves
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  }else{
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function getAllLeaves(req, res) {
  const { id, roleactions } = req.user;     
  const haveAccess = roleactions.includes(`${MODULE}.read`);  
  if (haveAccess) {
    db.LeaveTransactions.findAll({
      include:[
        {model: db.Employee, as:'Employee'}
      ]
    })
      .then(leaves => {
        res.status(200).json({
          status: "success",
          leaves: leaves
        });
      })
      .catch(err => {
        res.status(404).json({
          status: "failed",
          msg: err
        });
      });
  }else{
    res.status(404).json({
      status: "failed",
      msg: "You don't have required access for completing this task."
    });
  }
}

export async function updateLeave(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.edit`);
  if (haveAccess) {
    db.LeaveTransactions.update(
      { ...req.body, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(leave => {
        res.status(200).json({
          status: "success",
          leave
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

export async function deleteLeave(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.delete`);
  if (haveAccess) {
    db.LeaveTransactions.destroy({
      where: {
        id: id
      }
    })
      .then(leave => {
        res.status(200).json({
          status: "success",
          leave
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