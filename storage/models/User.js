import Sequelize from 'sequelize'

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
        office_email: { type: DataTypes.STRING, allowNull: false },
        personal_email: { type: DataTypes.STRING, allowNull: false },
        designation: { type: DataTypes.STRING, allowNull: false },
        shift: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.TINYINT, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATEONLY, allowNull: true },
        aadhar_number: { type: DataTypes.STRING, allowNull: true },
        pan_number: { type: DataTypes.STRING, allowNull: true },
        contact_number: { type: DataTypes.STRING, allowNull: true },
        emergency_number: { type: DataTypes.STRING, allowNull: true },
        doj: { type: DataTypes.DATEONLY, allowNull: true },
        permanent_address: { type: DataTypes.TEXT, allowNull: true },
        temporary_address: { type: DataTypes.TEXT, allowNull: true },
        marital_status: { type: DataTypes.STRING, allowNull: true },
        passkey: { type: DataTypes.STRING, allowNull: true },
        timeout: { type: DataTypes.DATE, allowNull: true }
      },
      { sequelize, modelName: "employees", timestamps: false }
    );
  }
}

export default User;