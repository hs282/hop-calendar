
import Sequelize from 'sequelize'
const sequelize = new Sequelize('mysql://root:fantasticsniffle@localhost:3306/sys');
const DataTypes = Sequelize.DataTypes

const Course = sequelize.define('Course', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  admins: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tasks: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    freezeTableName: true
});

export default Course;