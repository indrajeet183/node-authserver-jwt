import Sequelize from "sequelize";

class Roles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
        created_at: {type: DataTypes.DATE, allowNull:false, defaultValue: DataTypes.NOW},
        updated_at: {type: DataTypes.DATE, allowNull:true}
      },
      {
        sequelize,
        modelName: "roles",
        timestamps: false
      }
    );
  }

  static associate(sequelize) {
    this.hasMany(sequelize.RolesActions,{as:'RolesActions',foreignKey:'role_id'});   
  }
}

export default Roles;
