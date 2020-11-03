
import Sequelize from 'sequelize'
const sequelize = new Sequelize('mysql://root:fantasticsniffle@localhost:3306/sys');
const DataTypes = Sequelize.DataTypes

const Task = sequelize.define('Task', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false
  },
  info: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true
});

export default Task;