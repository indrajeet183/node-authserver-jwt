import Sequelize from "sequelize";

class ModuleActions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        module: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.STRING, allowNull: false },
        updated_at: { type: DataTypes.STRING, allowNull: true }
      },
      {
        sequelize,
        modelName: "module_actions",
        timestamps: false,
        tableName: "module_actions"
      }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.Modules, {
      as: "Modules",
      foreignKey: { name: "id" },
      sourceKey: "module"
    });
    //this.hasMany(sequelize.Roles,{as:'Module',foreignKey:{name:'id'},sourceKey:'module_id'});
    //this.hasMany(sequelize)
  }
}

export default ModuleActions;
