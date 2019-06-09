import Sequelize from "sequelize";
import User from "./models/User";
import Designations from "./models/Designations";
import Shifts from "./models/Shifts";
import ProjectGroups from "./models/ProjectGroups";
import LeaveTransactions from "./models/LeaveTransactions";
import LeavesAvailable from "./models/LeavesAvailable";
import TimeSheet from "./models/TimeSheet";
import Roles from "./models/Roles";
import RolesActions from "./models/RolesActions";
import Modules from "./models/Modules";
import ModuleActions from "./models/ModuleActions";
import Projects from "./models/Projects";
import Attendance from "./models/Attendance";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const models = {
  Employee: User.init(sequelize, Sequelize),
  Designations: Designations.init(sequelize, Sequelize),
  Shifts: Shifts.init(sequelize, Sequelize),
  ProjectGroups: ProjectGroups.init(sequelize, Sequelize),
  LeaveTransactions: LeaveTransactions.init(sequelize, Sequelize),
  LeavesAvailable: LeavesAvailable.init(sequelize, Sequelize),
  TimeSheet: TimeSheet.init(sequelize, Sequelize),
  Roles: Roles.init(sequelize, Sequelize),
  RolesActions: RolesActions.init(sequelize, Sequelize),
  Modules: Modules.init(sequelize, Sequelize),
  ModuleActions: ModuleActions.init(sequelize, Sequelize),
  Projects: Projects.init(sequelize, Sequelize),
  Attendance: Attendance.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

export default db;
