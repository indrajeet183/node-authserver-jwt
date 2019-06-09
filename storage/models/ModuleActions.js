import Sequelize from "sequelize";

class ModuleActions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        module: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: true }
      },
      {
        sequelize,
        timestamps: false,
        tableName: "module_actions"
      }
    );
  }

  static associate(sequelize) {    
    this.hasOne(sequelize.Modules,{as:'Module',sourceKey:'module',foreignKey:'id'});
  }
}

export default ModuleActions;
