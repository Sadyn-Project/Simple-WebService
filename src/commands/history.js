const chalk = require('chalk');

module.exports = {
	name: 'history',
	description: 'Read a full history of file changes since the process started.',
	run({ history }) {
		history.length > 0 ? console.log(history.join('\n')) : console.log(chalk.redBright('Your history is empty.'));
	},
};