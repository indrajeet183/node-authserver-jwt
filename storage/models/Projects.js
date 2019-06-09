import Sequelize from "sequelize";

class Projects extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        project_group: { type: DataTypes.STRING, allowNull: true },
        project_name: { type: DataTypes.STRING, allowNull: false },
        project_key: { type: DataTypes.STRING, allowNull: true },
        project_type: { type: DataTypes.STRING, allowNull: true },
        project_lead: { type: DataTypes.STRING, allowNull: true },
        project_url: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        pcounter: { type: DataTypes.DECIMAL, allowNull: true },
        assignee_type: { type: DataTypes.DECIMAL, allowNull: true },
        avatar: { type: DataTypes.DECIMAL, allowNull: true },
        original_key: { type: DataTypes.STRING, allowNull: true },
        project_id: { type: DataTypes.STRING, allowNull: true }
      },
      {
        sequelize,
        tableName:'allure_project',
        timestamps: false
      }
    );
  }
  static associate(sequelize) {
    this.hasOne(sequelize.ProjectGroups, {
        as: "ProjectGroups",      
        foreignKey: "id",
        sourceKey: "project_group" ,
      });

      this.hasOne(sequelize.Employee, {
        as: "Employee",      
        foreignKey: "id",
        sourceKey: "project_lead" ,
      });
  }
}

export default Projects;
