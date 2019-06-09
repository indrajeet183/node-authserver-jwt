import db from "../../storage/db";
import moment from "moment";
const MODULE = "Attendance";
import { Op } from "sequelize";

export async function addAttendance(req, res) {
  const { role, roleactions, code } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.create`);

  if (haveAccess) {
    db.Attendance.create({
      jira_id: req.body.jira_id,
      emp_code: code,
      attendance_date: req.body.attendance_date,
      project_id: req.body.project_id,
      attendance_hours: req.body.attendance_hours,
      attendance_comments: req.body.attendance_comments
    })
      .then(result => {
        res.status(200).json({
          status: "success",
          attendance: result
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

export async function getTodaysAttendance(req, res) {
  const { isAdmin, roleactions, code } = req.user;
  const haveAccess = roleactions.includes(`${MODULE}.read`);
  let where = {
    attributes: ["name", "id"],
    include: [
      {
        model: db.Attendance,
        as: "Attendance",
        where: {
          date: new Date(2018, 10, 21)
        }
      }
    ]
  };

  if (!isAdmin) {
    where["where"] = { employee_code: code };
  }

  if (haveAccess) {
    db.Employee.findAll(where)
      .then(attendances => {
        const mappedAttendance = attendances.map(emp => {
          return {
            name: emp.name,
            id: emp.id,
            code,
            hours: { ...calculateHours(emp.Attendance) }
          };
        });

        res.status(200).json({
          status: "success",
          attendances: mappedAttendance
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

export async function getAttendanceByYearAndMonthAndWeek(req, res) {
  const { isAdmin } = req.user;
  const { year, month, week } = req.body;
  console.log(year, month, week);

  const firstDay = getStartDateByWeekAndYear(week, year, month);
  const lastDay = getEndDateByWeekAndYear(week, year, month);

  if (isAdmin) {
    db.Employee.findAll({
      attributes: ["name", "id", "code"],
      include: [
        {
          model: db.Attendance,
          as: "Attendance",
          where: {
            date: { [Op.between]: [firstDay, lastDay] }
          }
        }
      ]
    })
      .then(attendances => {
        const mappedAttendance = attendances.map(emp => {
          const calculatedHoursArray = calculateHours(emp.Attendance);
          const punchData = getPunches(emp.Attendance);
          
          let arr = [];
          const keys = Object.keys(calculatedHoursArray);
          let totalWeekHours = 0;
          keys.forEach(e => {
            arr[e] = parse(calculatedHoursArray[e]);
            totalWeekHours += parseFloat(calculatedHoursArray[e]);
          });
          
          return {
            name: emp.name,
            id: emp.id,
            code: emp.code,
            hours: { ...arr },
            avg: parse(totalWeekHours / keys.length),
            data: {...punchData}
          };
        });

        res.status(200).json({
          status: "success",
          attendances: mappedAttendance
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

export async function updateAttendance(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.edit`);
  if (haveAccess) {
    db.Attendance.update(
      { ...req.body, updated_at: new Date() },
      {
        where: {
          id: id
        }
      }
    )
      .then(attendance => {
        res.status(200).json({
          status: "success",
          attendance
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

export async function deleteAttendance(req, res) {
  const { role, roleactions } = req.user;
  const id = req.params.id;
  const haveAccess = roleactions.includes(`${MODULE}.delete`);
  if (haveAccess) {
    db.Attendance.destroy({
      where: {
        id: id
      }
    })
      .then(attendance => {
        res.status(200).json({
          status: "success",
          attendance
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
    db.Attendance.findAll({
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
  emp_codes.length
    ? (where.emp_code = { [Op.in]: emp_codes ? emp_codes : [] })
    : where;
  project_ids.length
    ? (where.project_id = { [Op.in]: project_ids ? project_ids : [] })
    : where;
  jira_ids.length
    ? (where.jira_id = { [Op.in]: jira_ids ? jira_ids : [] })
    : where;

  from_date && to_date
    ? (where.attendance_date = {
        [Op.between]: [from_date, to_date]
      })
    : where;

  if (isAdmin) {
    db.Attendance.findAll({
      where,
      include: [
        { model: db.Employee, as: "Employee" },
        { model: db.Projects, as: "Project" }
      ]
    })
      .then(attendance => {
        res.status(200).json({
          status: "success",
          attendance
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

const parse = num => {
  let temp_date = new Date(0, 0);
  temp_date.setSeconds(+num * 60 * 60);
  return temp_date.toTimeString().slice(0, 8);
};

const calculateHours = attendance => {
  let arr = [];
  if(attendance.length === 1)
    return arr;
  attendance.reduce((firstEle, secondEle) => {
    if (
      firstEle.type === "IN" &&
      secondEle.type === "OUT" &&
      (firstEle !== undefined && secondEle !== undefined)
    ) {      
      const index = moment(firstEle.time).format('DD/MM/YYYY');    
      arr[index] = arr[index]
        ? arr[index] +
          Math.abs(
            new Date(firstEle.time).getTime() -
              new Date(secondEle.time).getTime()
          ) /
            36e5
        : 0 +
          Math.abs(
            new Date(firstEle.time).getTime() -
              new Date(secondEle.time).getTime()
          ) /
            36e5;
    }
    return secondEle;
  });

  return arr;
};

const getPunches = attendance => {
  const keys = Object.keys(attendance);
  let arr = [];

  keys.forEach(punch => {
    const index = moment(attendance[punch].time).format('DD/MM/YYYY');    
    console.log(index)
    if (arr[index] === undefined) arr[index] = [];
    arr[index].push({
      time: new Date(attendance[punch].time).toGMTString().slice(17, -4),
      type: attendance[punch].type
    }); 
    arr[index].sort((first,second) => first.time > second.time);
  });
  
  return arr;
};

const getStartDateByWeekAndYear = function(week, year, month) {
  return moment({ y: year, M: month - 1, d: 1 })
    .add(week - 1, "w")
    .day("Monday")
    .toDate();
};

const getEndDateByWeekAndYear = function(week, year, month) {
  return moment({ y: year, M: month - 1, d: 1 })
    .add(week - 1, "w")
    .day("Saturday")
    .toDate();
};
