import Sequelize from "sequelize";

class ProjectGroups extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
        code: { type: DataTypes.STRING, allowNull: true },
        leader: { type: DataTypes.STRING, allowNull: true },
        resources: { type: DataTypes.STRING, allowNull: true },
        under_projects: { type: DataTypes.STRING, allowNull: true }
      },
      {
        sequelize,
        modelName: "project_groups",
        timestamps: false
      }
    );
  }
}

export default ProjectGroups;
