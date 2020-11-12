
import Sequelize from 'sequelize'
import { user, host, password, port, database } from './credentials.js'

// Option 1: Passing a connection URI

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres'
});
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