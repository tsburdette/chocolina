try {
	var Discord = require('discord.js');
} catch (e) {
	console.log(e.stack);
	console.log(process.version);
	console.log("Looks like your libs are missing or wrong. Please run npm install and check for errors.");
	process.exit();
}
console.log("Starting Chocolina.\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);

try {
	var token = require('./auth.json').token;
} catch (e) {
	console.log("auth.json either missing or wrong. Please ensure auth.json has a token.");
	process.exit();
}

var wishlist;
try {
	wishlist = require("./wishlist.json");
} catch(e) {
	// no wishlist file found
	wishlist = {};
}

var commands = {
	"ping": {
		description: "responds with 'pong'. Used as a heartbeat command.",
		process: (bot, msg, suffix) => {
			msg.channel.sendMessage(msg.author + " pong!");
		}
	},
	"lolpn": {
		description: "Links the current League of Legends patch notes.",
		process: (bot, msg, suffix) => {
			require('./scraper.js').scrape("http://na.leagueoflegends.com/en/tag/patch-notes", {
					first: "h4 a"
				}, (err, data) => {
					msg.channel.sendMessage(err || "The latest League of Legends patch notes can be found here: http://na.leagueoflegends.com" + data.first.prop("href"));
			});
		}
	},
	"wishlist": {
		description: "A list of things you would like me to do someday!",
		process: (bot, msg, suffix) => {
			console.log("Wishlisting!");
			wishlist[new Date()] = suffix;
			console.log("Added to wishlist!");
			require("fs").writeFile("./wishlist.json", JSON.stringify(wishlist, null, '\t'), null);
			console.log("Written to file!");
			msg.channel.sendMessage("Added to wishlist: " + suffix);
		}
	},
	"getWishlist": {
		description: "Lists out all the wishlist items to date.",
		process: (bot, msg, suffix) => {
			var text = "Current wishlist:\n";
			for (var wish in wishlist) {
				text += JSON.stringify(wish) + "\n";
			}
			msg.channel.sendMessage(text);
		}
	}
}

var bot = new Discord.Client();

bot.on("ready", () => {
	console.log("I'm Chocolina, super time-traveling salesgirl!");
	// TODO: Make command prefix arbitrary, help response, other servers?
	// bot.user.setGame("Try \'!help\'.")
});

bot.on("disconnected", () => {
	console.log("Disconnected!");
	process.exit(1);
});

function parseCommand(msg) {
	// TODO: Make command prefix arbitrary.
	if ((msg.author.id != bot.user.id) && (msg.content.startsWith("!"))) {
		console.log(msg.author + " requested " + msg.content);
		// TODO: Make command prefix arbitrary
		var cmdTxt = msg.content.split(" ")[0].substring("!".length);
		var suffix = msg.content.substring(cmdTxt.length + "!".length + 1);
		try {
			commands[cmdTxt].process(bot, msg, suffix);
		} catch(e) {
			msg.channel.sendMessage("I don't know how to " + cmdTxt);
		}
	}
}

bot.on('message', (msg) => {
	if (msg.content === 'who?') {
		msg.channel.sendFile('images\\chocobocolina.gif');
	} else {
		parseCommand(msg);
	}
});

bot.login(token);