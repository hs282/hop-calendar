
import Sequelize from 'sequelize'
const sequelize = new Sequelize('mysql://root:fantasticsniffle@localhost:3306/sys');
const DataTypes = Sequelize.DataTypes

const Student = sequelize.define('Student', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courses: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true
});

export default Student;