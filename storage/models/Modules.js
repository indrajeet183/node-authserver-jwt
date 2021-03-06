import Sequelize from "sequelize";

class Modules extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: true }
      },
      {
        sequelize,
        modelName: "modules",
        timestamps: false,
        tableName: "modules"
      }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.RolesActions, {
      as: "RoleActions",
      sourceKey: "id",
      foreignKey: "module_id"
    });
  }
}

export default Modules;
