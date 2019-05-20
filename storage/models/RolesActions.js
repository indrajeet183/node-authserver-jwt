import Sequelize from 'sequelize'

class RolesActions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        module_id: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.STRING, allowNull: false },
        updated_at: { type: DataTypes.STRING, allowNull: false },        
      },
      { sequelize, modelName: "roles_action", timestamps: false, tableName:"roles_action" }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.Roles,{as:'Role',foreignKey:{name:'id'},sourceKey:'role_id'});
    this.hasMany(sequelize.Modules,{as:'Modules',foreignKey:{name:'id'},sourceKey:'module_id'});
    //this.hasMany(sequelize)
  }
}

export default RolesActions;