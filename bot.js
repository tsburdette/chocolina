const Discord = require('discord.js');

const bot = new Discord.Client();

const token = require('./auth.json').token;

bot.on('ready', () => {
	console.log('I am ready!');
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