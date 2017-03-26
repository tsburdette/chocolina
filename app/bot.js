// Dependencies for bot module
let Discord = debugRequire('discord.js', "Looks like your libs are missing or wrong. Please run npm install and check for errors.");
let token = debugRequire('./auth.json', "auth.json either missing or wrong. Please ensure auth.json has a token.").token;
let bot = new Discord.Client();
console.log(`Starting Chocolina.
             Node version: ${process.version}
             Discord.js version: ${Discord.version}`);

let commands = {
    "ping": require('./handlers/pingHandler.js').command,
    "lolpn": require('./handlers/leaguePatchNotesHandler.js').command
};

bot.on("ready", () => {
    console.log("I'm Chocolina, super time-traveling salesgirl!");
    // TODO: Make command prefix arbitrary, help response, other servers?
});

bot.on("disconnected", () => {
    console.log("Disconnected!");
    process.exit(1);
});


bot.on('message', (msg) => {
    if (msg.content === 'who?') {
        msg.channel.sendFile('images/chocobocolina.gif');
    } else {
        parseCommand(msg);
    }
});

bot.login(token);

function debugRequire(npmPackage, errorMessage) {
    try {
        return require(npmPackage);
    } catch (e) {
        console.log(e.stack);
        console.log(errorMessage);
        process.exit();
    }
}

function parseCommand(msg) {
    // TODO: Make command prefix arbitrary.
    if (isMessageToBot(msg)) {
        console.log(msg.author + " requested " + msg.content);
        // TODO: Make command prefix arbitrary
        let cmdTxt = msg.content.split(" ")[0].substring("!".length);
        let suffix = msg.content.substring(cmdTxt.length + "!".length + 1);
        try {
            commands[cmdTxt].process(bot, msg, suffix);
        } catch (e) {
            msg.channel.sendMessage("I don't know how to " + cmdTxt);
        }
    }
}

function isMessageToBot(msg) {
    msg.author.id !== bot.user.id && msg.content.startsWith("!")
}
