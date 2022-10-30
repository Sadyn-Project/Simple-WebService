const chalk = require('chalk');

module.exports = {
	name: 'views',
	description: 'Check out how many people visited your website.',
	run({ views }) {
		const lastWeek = views.filter(timestamp => timestamp >= Date.now() - 6048e5);
		const lastDay = views.filter(timestamp => timestamp >= Date.now() - 864e5);
		console.log(`${chalk.cyan('Total views:')} ${chalk.underline(views.length)}\n${chalk.cyan('Weekly views:')} ${chalk.underline(lastWeek.length)}\n${chalk.cyan('Daily views:')} ${chalk.underline(lastDay.length)}\n${chalk.italic.redBright('Please note these views are since this process started running.')}`);

	},
};