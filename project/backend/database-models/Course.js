
import Sequelize from 'sequelize'
import { user, host, password, port, database } from '../credentials.js'
import Task from './Task.js';

// Option 1: Passing a connection URI

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres'
});
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
  // taskObjs: {
  //   type: DataTypes.ARRAY(Task),
  //   allowNull: false
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    freezeTableName: true
});

export default Course;