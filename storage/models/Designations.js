import Sequelize from "sequelize";

class Designations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: true },
        code: { type: Sequelize.STRING, allowNull: true }
      },
      {
        sequelize,
        modelName: "designations",
        timestamps: false
      }
    );
  }
}

export default Designations;
