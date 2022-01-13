const Sequelize = require('sequelize');
const database = require('../db');

const Users = database.define ('users', {
	login: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Users;