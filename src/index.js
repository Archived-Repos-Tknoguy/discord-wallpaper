// does stuff and things aaaaaaaaa

const discordjs = require('discord.js');
const wallpaper = require('wallpaper');
const util = require('util');
const ostmpdir = require('os-tmpdir');
const fs = require('fs');
const request = require('request');

var BotClient = new discordjs.Client();
var Config;
const tmpDir = ostmpdir() + '/discord-wallpaper/';

try {
	Config = require('./cfg/config.json');
} catch(er) {
	console.error('ffs make a config file in the cfg folder');
	process.exit(1);
}

function startAndStuff() {
	if (!fs.existsSync(tmpDir))
		fs.mkdirSync(tmpDir);
	
	BotClient.loginWithToken(Config.Token, (err, token) => {
		if (err) {
			console.error('failed to log in oh no (check yo connection or dns)');
			process.exit(1);
			return;	// return because idk i wanted to
		}
	});
}

BotClient.on('message', (msg) => {
	if (Config.ListenChannels.indexOf(msg.channel.id) <= -1 && Config.ListenChannels.indexOf('all') <= -1)
		return;
	
	if (!msg.attachments.length)
		return;
	
	/*if (msg.author.equals(BotClient.user))
		return;*/
	
	request.get(msg.attachments[0].url).on('response', (data) => {
		if (data.headers['content-type'] != 'image/png')
			return;
		
		data.pipe(fs.createWriteStream(tmpDir + util.format('%s.png', msg.id)));
		
		data.on('end', () => {
			wallpaper.set(util.format('%s%s.png', tmpDir, msg.id));
			console.log(util.format('wallpaper set to %s by (%s/%s)', msg.attachments[0].url, msg.author.name, msg.author.id));
		});
	});
});

BotClient.on('ready', () => {
	console.log('yes. started. woooohoooo');
});

startAndStuff();
