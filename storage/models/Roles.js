import Sequelize from "sequelize";

class Roles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize,
        modelName: "roles",
        timestamps: false
      }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.RolesActions,{as:'RolesActions',foreignKey:{name:'role_id'},sourceKey:'id'});   
    //this.hasMany(sequelize)
  }
}

export default Roles;
