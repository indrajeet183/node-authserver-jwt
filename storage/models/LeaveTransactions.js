import Sequelize from "sequelize";

class LeaveTransactions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: false },
        Eid: { type: DataTypes.INTEGER, allowNull: false },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "pending"
        },
        post_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        from_date: { type: DataTypes.DATEONLY, allowNull: false },
        to_date: { type: DataTypes.DATEONLY, allowNull: false },
        leave_title: { type: DataTypes.STRING, allowNull: false },
        leave_cc: { type: DataTypes.TEXT, allowNull: true },
        leave_bcc: { type: DataTypes.TEXT, allowNull: true },
        hr_response: { type: DataTypes.TEXT, allowNull: true },
        reason: { type: DataTypes.TEXT, allowNull: true }
      },
      {
        sequelize,
        modelName: "leaves_transactions",
        timestamps: false,
        tableName: "leaves_transactions"
      }
    );
  }

  static associate(sequelize) {
    this.hasOne(sequelize.Employee, {
      as: "Employee",
      foreignKey: "id",
      sourceKey: "Eid"
    });
  }
}

export default LeaveTransactions;
