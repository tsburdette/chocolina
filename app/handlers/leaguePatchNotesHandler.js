// Dependencies for LeaguePatchNotesHandler
let scraper = require('../scraper.js');

class LeaguePatchNotesHandler {
    constructor() {
        this.description = "Links the current League of Legends patch notes.";
    }

    fetchPatchNotes(channel) {
        scraper.scrape("http://na.leagueoflegends.com/en/tag/patch-notes", {
            first: "h4 a"
        }, (err, data) => {
            msg.channel.sendMessage(err || "The latest League of Legends patch notes can be found here: http://na.leagueoflegends.com" + data.first.prop("href"));
        });
    }
}

let handler = new LeaguePatchNotesHandler();

exports.command = {
    description: handler.description,
    process: (bot, msg, suffix) => {
        handler.fetchPatchNotes(msg.channel)
    }
};

exports.LeaguePatchNotesHandler = LeaguePatchNotesHandler;
