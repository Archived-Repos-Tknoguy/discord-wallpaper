// does stuff and things aaaaaaaaa

const discordjs = require('discord.js');
const wallpaper = require('wallpaper');
const util = require('util');

var BotClient = new discordjs.Client();
var Config;

try {
	require('./cfg/config.json');
} catch(er) {
	console.error('ffs make a config file in the cfg folder');
	process.exit(1);
}

function startAndStuff() {
	BotClient.loginWithToken(Config.Token, (err, token) => {
		if (err) {
			console.error('failed to log in oh no (check yo connection or dns)');
			process.exit(1);
			return;	// return because idk i wanted to
		}
	});
}

BotClient.on('message', (msg) => {
	// things
});

BotClient.on('ready', () => {
	console.log('yes. started. woooohoooo');
});

startAndStuff();
