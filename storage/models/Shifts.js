import Sequelize from 'sequelize'

class Shifts extends Sequelize.Model {
  static init(sequelize,DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
        name: {type: DataTypes.STRING, allowNull:true},
        code : {type: DataTypes.STRING, allowNull:true}  
      },{
          sequelize,
          modelName:'shifts',
          timestamps:false
      }
    )
  }
}

export default Shifts;