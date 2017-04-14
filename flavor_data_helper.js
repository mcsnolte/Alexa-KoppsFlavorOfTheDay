'use strict';
let _ = require('lodash');
let rp = require('request-promise');
let cheerio = require('cheerio');
let ENDPOINT = 'https://www.kopps.com/flavor-forecast';

function FlavorDataHelper() {
}

FlavorDataHelper.prototype.getPrompt = function () {
    return "For the flavor of the day, ask me for today\'s flavor of the day.";
};

FlavorDataHelper.prototype.getTodaysDay = function () {
    return new Date(Date.now()).getDate();
};

FlavorDataHelper.prototype.formatResponse = function (json, date) {
    console.log(json[0]);
    if (json[0] === undefined || json[1] === undefined) {
        return "Sorry, flavors for the provided date could not be found."
    }

    let template = _.template("The custard flavors for the <say-as interpret-as='date' format='d'>${date}</say-as> are ${one} and ${two}");

    return template({
        one: json[0],
        two: json[1],
        date: date
    });
};

FlavorDataHelper.prototype.getKoppsHtml = function () {
    let options = {
        method: 'GET',
        uri: ENDPOINT,
        resolveWithFullResponse: true
        // json: true
    };
    return rp(options);
};

FlavorDataHelper.prototype.parseFlavorsForDay = function (html, day) {
    day = day || this.getTodaysDay();
    let $ = cheerio.load(html);

    let json = {};
    let dayHtml = $('div', `#${day}`);

    dayHtml.children('h3').each(function (i, el) {
        json[i] = $(el).text();
    });

    return json;
};

module.exports = FlavorDataHelper;
