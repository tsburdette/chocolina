try {
	var Discord = require('discord.js');
} catch (e) {
	console.log(e.stack);
	console.log(process.version);
	console.log("Looks like your libs are missing or wrong. Please run npm install and check for errors.");
	process.exit();
}
console.log("Starting Chocolina.\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);

const bot = new Discord.Client();

const token = require('./auth.json').token;

bot.on('ready', () => {
	console.log("I'm Chocolina, super time-traveling salesgirl!");
});

bot.on('message', message => {
	if (message.content === 'ping') {
		message.channel.sendMessage('pong');
	}
	if (message.content === 'who?') {
		message.channel.sendFile('images\\chocobocolina.gif');
	}
});

bot.login(token);