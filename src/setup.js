const fs = require('fs');
const chalk = require('chalk');
const package = require('../package.json');

if (process.argv.includes('force')) {
	console.log(chalk.blue('Recursively generating files...'));
	if (fs.existsSync('pages')) fs.rmSync('pages', { recursive: true });
	if (fs.existsSync('files')) fs.rmSync('files', { recursive: true });
	if (fs.existsSync('config.json')) fs.rmSync('config.json', { recursive: true });
} else console.log(chalk.blue('Generating files...'));

let suggestRecursive = 0;

if (!fs.existsSync('pages')) fs.mkdirSync('pages');
else {
	console.log(chalk.redBright(`${chalk.underline('pages')} folder already exists.`));
	suggestRecursive = 1;
}

if (!fs.existsSync('files')) fs.mkdirSync('files');
else {
	console.log(chalk.redBright(`${chalk.underline('files')} folder already exists.`));
	suggestRecursive = 1;
}

const config = fs.existsSync('config.json') ? require('../config.json') : null;
console.log(config)

if (!config || config.version !== package.version) {
	console.log(chalk.blue('Generating config.json...'));
	const newConfig = require('./sample.json');
	newConfig.version = package.version;
	if (config !== null) {
		for (const y in Object.keys(newConfig)) {
			if (!['version'].includes(y) && Object.keys(config).includes(y)) newConfig[y] = config[y];
		}
	}
	fs.writeFileSync('config.json', JSON.stringify(newConfig, null, 2));
} else {
	console.log(chalk.redBright(`${chalk.underline('config.json')} file already exists.`));
	suggestRecursive = 1;
}

if (suggestRecursive) console.log(chalk.bold.green(`Execute ${chalk.underline('npm run setup force')} to setup files recursively.\nATTENTION: Recursive setup will reset previous files.`));

console.log(chalk.italic.cyan('Setup finished succesfully!'));