import Sequelize from "sequelize";

class LeavesAvailable extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        eid: { type: DataTypes.INTEGER, allowNull: true },
        sick: { type: DataTypes.FLOAT, allowNull: true },
        casual: { type: DataTypes.FLOAT, allowNull: true },
        emergency: { type: DataTypes.FLOAT, allowNull: true }
      },
      {
        sequelize,
        modelName: "leaves_available",
        timestamps: false
      }
    );
  }
}

export default LeavesAvailable;
