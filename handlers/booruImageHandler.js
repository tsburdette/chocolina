// Dependencies for booruImageHandler
let scraper = require('../scraper.js');

class BooruImageHandler {
    constructor() {
        this.description = "Posts a random booru image matching the tags.";
		this.baseUrl = "http://safebooru.org/index.php?page=dapi&s=post&q=index";
		this.page = 1;
		this.limit = 100;
		this.tags = "";
    }

    fetchBooruImage(msg, suffix) {
		this.tags = suffix;
        scraper.scrape(this.baseUrl + "&pid=" + this.page + "&limit=" + this.limit + "&tags=" + this.tags, {
            file_url: "posts post"
        }, true, (err, data) => {
			if (err) {
				msg.channel.sendMessage(err);
			} else {
				var randomIndex = Math.floor(Math.random() * (this.limit + 1));
				try {
					var url = "http:" + data.file_url.get(0).attribs.file_url;
					console.log(url);
					msg.channel.sendFile(url);
				} catch (e) {
					msg.channel.sendMessage("That tag doesn't seem to exist.")
				}

			}
        });
    }
}

let handler = new BooruImageHandler();

exports.command = {
    description: handler.description,
    process: (bot, msg, suffix) => {
        handler.fetchBooruImage(msg, suffix)
    }
};