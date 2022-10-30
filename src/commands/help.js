const chalk = require('chalk');

module.exports = {
	name: 'help',
	description: 'Get a full list of all available commands.',
	run({ commands }) {
		const list = commands.map(cmd => `- ${chalk.bold.gray(cmd.name)} ${cmd.description ? chalk.italic(cmd.description) : ''}`);
		console.log(list.join('\n'));
	},
};