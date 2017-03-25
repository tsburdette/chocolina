class PingHandler {
    constructor() {
        this.description = "Responds with 'pong'. Used as a heartbeat command.";
    }

    ping(msg) {
        msg.channel.sendMessage(msg.author + " pong!");
    }
}

let handler = new PingHandler();

exports.command = {
    description: handler.description,
    process: (bot, msg, suffix) => {
        handler.ping(msg);
    }
};
