import Sequelize from "sequelize";

class LeaveTransactions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: true },
        eid: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
        leader: { type: DataTypes.STRING, allowNull: true },
        resources: { type: DataTypes.STRING, allowNull: true },
        under_projects: { type: DataTypes.STRING, allowNull: true }
      },
      {
        sequelize,
        modelName: "leaves_transactions",
        timestamps: false
      }
    );
  }
}

export default LeaveTransactions;
