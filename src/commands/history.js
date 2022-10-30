module.exports = {
	name: 'history',
	description: 'Read a full history of file changes since the process started.',
	run({ history }) {
		console.log(history.join('\n'));
	},
};