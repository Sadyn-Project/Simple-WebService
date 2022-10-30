const chalk = require('chalk');

module.exports = {
	name: 'exit',
	description: 'Exit the process safely.',
	async run({ server }) {
		console.log(chalk.redBright('Safely exiting process...'));
		server.close();
		await process.exit(0);
	},
};