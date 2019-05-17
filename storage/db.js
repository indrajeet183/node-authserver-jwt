import Sequelize from 'sequelize'
import User from './models/User'
import Designations from './models/Designations'
import Shifts from './models/Shifts'
import ProjectGroups from './models/ProjectGroups'
import LeaveTransactopns from './models/LeaveTransactions'
import LeavesAvailable from './models/LeavesAvailable'
import TimeSheet from './models/TimeSheet'

const sequelize = new Sequelize(process.env.DATABASE_URL);

const models = {
  Employee: User.init(sequelize,Sequelize),
  Designations: Designations.init(sequelize,Sequelize),
  Shifts: Shifts.init(sequelize,Sequelize),
  ProjectGroups: ProjectGroups.init(sequelize,Sequelize),
  LeaveTransactopns: LeaveTransactopns.init(sequelize,Sequelize),
  LeavesAvailable: LeavesAvailable.init(sequelize,Sequelize),
  TimeSheet: TimeSheet.init(sequelize,Sequelize),  
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));


const db = {
  ...models,
  sequelize
}

export default db;