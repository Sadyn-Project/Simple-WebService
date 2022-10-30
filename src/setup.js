const fs = require('fs');
const chalk = require('chalk');

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

if (!fs.existsSync('config.json')) fs.copyFileSync('src/sample.json', 'config.json');
else {
	console.log(chalk.redBright(`${chalk.underline('pages')} file already exists.`));
	suggestRecursive = 1;
}

if (suggestRecursive) console.log(chalk.bold.green(`Execute ${chalk.underline('npm run setup force')} to setup files recursively.\nATTENTION: Recursive setup will reset previous files.`));

console.log(chalk.italic.cyan('Setup finished succesfully!'));