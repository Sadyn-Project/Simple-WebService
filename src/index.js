const express = require('express');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const watch = require('watch');
const chalk = require('chalk');
const opener = require('opener');
const readline = require('readline');

const package = require('../package.json');

const app = express();

if (package.version == 'canary') console.log(`You are currently running on a ${chalk.underline.yellow('canary')} version, we suggest you to use an official release.`);

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
let history = [];

watch.watchTree('./', { ignoreDotFiles: true }, async (f, current, previous) => {
	pages = glob.sync('pages/**/*.html').map(page => page.split('/').slice(1).join('/'));
let maintenance = {
	active: false,
	page: fs.existsSync('pages/_maintenance.html') ? fs.readFileSync('pages/_maintenance.html') : '<h1>Maintenance</h1>',
}

const log = (...args) => {
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	history.push(`${chalk.cyan(`[${count}]`)} [${time}] ${args.join(' ')}`);
};
	files = glob.sync('files/**').map(page => page.split('/').slice(1).join('/'));
	maintenance.page = fs.existsSync('pages/_maintenance.html') ? fs.readFileSync('pages/_maintenance.html') : '<h1>Maintenance</h1>';
	config = JSON.parse(fs.readFileSync('config.json'));
	let action = 'changed';
	if (previous === null) action = 'created';
	else if (current.nlink === 0) action = 'deleted';
	if (count) log(chalk.red(file), chalk.gray(`got ${action}.`));
	count += 1;
});

let views = [];

app.get('*', (req, res) => {
	if (maintenance.active) {
		res.set('Content-Type', 'text/html');
		res.status(200).send(maintenance.page);
	} else if (config.redirects[req.path.substring(1)]) {
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

const port = process.env.PORT || config.port || 8080;
const server = app.listen(port, async () => {
	console.log(chalk.cyan(`Server listening on port ${chalk.underline(port)}...`));
	opener(`http://localhost:${port}`);
	await prompt();
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const commands = glob.sync('src/commands/*.js').map(cmd => require(`./commands/${path.basename(cmd)}`));

async function prompt() {
	await rl.question(`\n${chalk.blue('WebService')} > `, async (input) => {
		const args = input.split(' ');
		if (commands.map(cmd => cmd.name).includes(args[0])) require(`./commands/${args[0]}`).run({ args: args.slice(1), log, commands, views, history, package, server, maintenance });
		else console.log(`${chalk.bold.red('Error')} - ${chalk.redBright('command not found')}`);
		await prompt();
	});
}