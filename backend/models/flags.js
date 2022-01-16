const Sequelize = require('sequelize');
const database = require('../db');

const Flags = database.define ('flags', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true
	},
	amountDigits: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		defaultValue: 4,
	}
})

module.exports = Flags;