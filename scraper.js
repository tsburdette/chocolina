const request = require("cloudscraper");
const cheerio = require("cheerio");

exports.scrape = function (url, data, cb) {
    request.get(url, (err, response, body) => {
        if (err) {
            return cb(err);
        }

        let $ = cheerio.load(body)
            , pageData = {}
        ;

        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]);
        });

        cb(null, pageData);
    });
};


