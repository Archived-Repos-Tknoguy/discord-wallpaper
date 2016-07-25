// does stuff and things aaaaaaaaa

const discordjs = require('discord.js');
const wallpaper = require('wallpaper');
const util = require('util');
const ostmpdir = require('os-tmpdir');
const fs = require('fs');

var BotClient = new discordjs.Client();
var Config;
const tmpDir = ostmpdir() + '/discord-wallpaper/';

try {
	require('./cfg/config.json');
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
	if (Config.ListenChannels.indexOf(msg.channel.id) <= -1)
		return;
	
	if (msg.attachments.length <= 0)
		return;
	
	if (msg.author.equals(BotClient.user)
		return;
	
	const imageType = getImageType(msg.attachments[0]);
	
	if (!imageType)
		return;
	
	fs.writeFileSync(tmpDir + util.format('%s.%s', msg.id, imageType), msg.attachments[0]);
	
	wallpaper.set(util.format('%s.%s', msg.id, imageType));
});

BotClient.on('ready', () => {
	console.log('yes. started. woooohoooo');
});

// it's ugly and uses magic numbers but who cares
function getImageType(buffer) {
    var int32View = new Int32Array(buffer);
    switch(int32View[0]) {
        case 1196314761: 
        	return "png";
            break;
        case 944130375:
        	return "gif";
            break;
        case 544099650:
        	return "bmp";
            break;
        case -520103681:
            return "jpg";
            break;
        default:
			return false;
            break;
    }	
}

startAndStuff();
