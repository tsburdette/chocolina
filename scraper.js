const request = require("cloudscraper")
	, cheerio = require("cheerio")
	;
exports.scrape = function(url, data, cb) {
	request.get(url, (err, response, body) => {
		if (err) { return cb(err); }
		
		let $ = cheerio.load(body)
		, pageData = {}
		;
		
		Object.keys(data).forEach(k => {
			pageData[k] = $(data[k]);
		});
		
		cb(null, pageData);
	});
}

/*

var url = "http://na.leagueoflegends.com/en/tag/patch-notes"

scrape(url, {
	first: "h4 a"
}, (err, data) => {
	console.log(err || "http://na.leagueoflegends.com" + data.first.prop("href"));
}); 

*/

