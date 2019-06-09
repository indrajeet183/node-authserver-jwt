import Sequelize from "sequelize";

class Attendance extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        employee_code: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        time: { type: DataTypes.DATE, allowNull: false },
        flag: { type: DataTypes.STRING, allowNull: false },
        type: {
          type: DataTypes.ENUM("IN", "OUT", "OT_IN", "OT_OUT", "INVALID"),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "time_record",
        timestamps: false
      }
    );
  }

  static associate(sequelize) {
    this.hasOne(sequelize.Employee, {
      as: "Employee",
      foreignKey: "code",
      sourceKey: "employee_code"
    });
  }
}

export default Attendance;
