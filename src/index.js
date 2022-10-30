const express = require('express');
const fs = require('fs');
const glob = require('glob');
const watch = require('watch');
const chalk = require('chalk');
const readline = require('readline');

const app = express();

let needSetup = 0;

if (!fs.existsSync('pages')) needSetup = 1;
if (!fs.existsSync('files')) needSetup = 1;
if (!fs.existsSync('config.json')) needSetup = 1;

if (needSetup) {
	console.log(chalk.bold.red(`Required files were not found. Execute ${chalk.underline('npm run setup')} to generate them.`));
	process.exit(0);
}

let config = require('../config.json');
let pages = glob.sync('pages/**/*.html').map(page => page.split('/').slice(1).join('/'));
let files = glob.sync('files/**').map(page => page.split('/').slice(1).join('/'));

let count = 0;

watch.watchTree('./', { ignoreDotFiles: true }, async (f, current, previous) => {
	pages = glob.sync('pages/**/*.html').map(page => page.split('/').slice(1).join('/'));
	files = glob.sync('files/**').map(page => page.split('/').slice(1).join('/'));
	config = JSON.parse(fs.readFileSync('config.json'));
	let action = 'changed';
	if (previous === null) action = 'created';
	else if (current.nlink === 0) action = 'deleted';
	if (count) console.log(`${chalk.cyan(`[${count}]`)} Content updated: ${chalk.red(f)} ${chalk.gray(`got ${action}`)}.`);
	count += 1;
});

let views = [];

app.get('*', (req, res) => {
	if (config.redirects[req.path.substring(1)]) {
		res.redirect(config.redirects[req.path.substring(1)]);
	} else if (req.path.endsWith('/') && pages.includes('index.html')) {
		const file = fs.readFileSync(`pages${req.path}index.html`);
		res.set('Content-Type', 'text/html');
		res.send(file);
		views.push(Date.now());
	} else if (pages.includes(`${req.path.substring(1)}.html`)) {
		const file = fs.readFileSync(`pages${req.path}.html`);
		res.set('Content-Type', 'text/html');
		res.send(file);
		views.push(Date.now());
	} else if (req.path !== '/' && files.includes(req.path.substring(1))) {
		res.sendFile(`${process.cwd()}/files${req.path}`);
	} else if (pages.includes('404.html')) {
		const file = fs.readFileSync('pages/404.html');
		res.set('Content-Type', 'text/html');
		res.status(404).send(file);
	} else res.status(404).send('Page not found');
});

const PORT = process.env.PORT || config.port || 8080;
app.listen(PORT, async () => {
	await console.log(chalk.cyan(`Server listening on port ${PORT}...`));
	await prompt();
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function prompt() {
	await rl.question(`\n${chalk.cyan('WebService')} > `, async (answer) => {
		switch (answer.split(' ')[0]) {
		case 'views': {
			const lastWeek = views.filter(timestamp => timestamp >= Date.now() - 6048e5);
			const lastDay = views.filter(timestamp => timestamp >= Date.now() - 864e5);
			console.log(`${chalk.cyan('Total views:')} ${chalk.underline(views.length)}\n${chalk.cyan('Weekly views:')} ${chalk.underline(lastWeek.length)}\n${chalk.cyan('Daily views:')} ${chalk.underline(lastDay.length)}`);
			break;
		} default: {
			console.log(chalk.bold.red('Error - Command not found'));
			break;
		}
		}
		await prompt();
	});
}