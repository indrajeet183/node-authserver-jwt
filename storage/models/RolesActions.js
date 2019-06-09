import Sequelize from "sequelize";

class RolesActions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        role_id: { type: DataTypes.INTEGER, allowNull: false },
        module_id: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.STRING, allowNull: false },
        updated_at: { type: DataTypes.STRING, allowNull: false }
      },
      {
        sequelize,
        timestamps: false,
        tableName: "roles_action"
      }
    );
  }

  static associate(sequelize) {
    this.hasOne(sequelize.Roles, {
      as: "Roles",
      foreignKey: "id",
      sourceKey:  "role_id" ,      
    });
    this.hasOne(sequelize.Modules, {
      as: "Modules",      
      foreignKey: "id",
      sourceKey: "module_id" ,
    });
  }
}

export default RolesActions;
