const chalk = require('chalk');

module.exports = {
    name: 'maintenance',
    description: 'Toggle maintenance mode.',
    run({ log, maintenance }) {
        maintenance.active = !maintenance.active;
        const message = maintenance ? chalk.redBright(`Maintenance got turned ${chalk.underline('on')}.`) : chalk.greenBright(`Maintenance got turned ${chalk.underline('off')}.`);
        log(message);
        console.log(message);
    }
}