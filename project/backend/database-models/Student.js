
import Sequelize from 'sequelize'
import { user, host, password, port, database } from '../credentials.js'

// Option 1: Passing a connection URI

let sequelize = null
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(
        'postgres://ujnnamqnliqscn:edc2dd3fe40cca2b58aae0be177189bd5a9bee5e3d1b6024f17c5d8ff98abc74@ec2-54-84-98-18.compute-1.amazonaws.com:5432/dfh5kacbr40b52'
    )
} else {
    sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'postgres',
    })
}
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
  email: {
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
  }, 
  completedTasks: {
    type: DataTypes.STRING,
  }
}, {
    freezeTableName: true
});

export default Student;