import Sequelize from "sequelize";

class TimeSheet extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        jira_id: { type: DataTypes.STRING, allowNull: true },
        emp_code: { type: DataTypes.STRING, allowNull: true },
        timesheet_date: { type: DataTypes.DATE, allowNull: true },
        project_id: { type: DataTypes.INTEGER, allowNull: true },
        timesheet_hours: { type: DataTypes.STRING, allowNull: true },
        timesheet_comments: { type: DataTypes.TEXT, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: true }
      },
      {
        sequelize,
        tableName: "timesheet",
        timestamps: false
      }
    );
  }

  static associate(sequelize) {
    this.hasOne(sequelize.Employee, {
      as: "Employee",      
      foreignKey: "code",
      sourceKey: "emp_code" ,
    });
    this.hasOne(sequelize.Projects, {
      as: "Project",      
      foreignKey: "id",
      sourceKey: "project_id" ,
    });
  }
  
}

export default TimeSheet;
