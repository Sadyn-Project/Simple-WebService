const chalk = require('chalk');

module.exports = {
	name: 'version',
	description: 'Detect current Sadyn WebService version.',
	run({ package }) {
		console.log(`Current version is ${chalk.underline.blue(package.version)}.`);
	},
};