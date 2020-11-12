
import Sequelize from 'sequelize'
import { user, host, password, port, database } from '../credentials.js'

// Option 1: Passing a connection URI

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres'
});
const DataTypes = Sequelize.DataTypes

const Instructor = sequelize.define('Instructor', {
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

export default Instructor;