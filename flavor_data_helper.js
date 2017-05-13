'use strict';
let _ = require('lodash');
let rp = require('request-promise');
let cheerio = require('cheerio');
let ENDPOINT = 'https://www.kopps.com/flavor-forecast';

function FlavorDataHelper() {
}

FlavorDataHelper.prototype.getPrompt = function () {
    return "Ask me what the flavor of the day is today.";
};

FlavorDataHelper.prototype.getTodaysDay = function () {
    return new Date(Date.now()).getDate();
};

FlavorDataHelper.prototype.formatResponse = function (data, date) {
    if (data[0] === undefined || data[1] === undefined) {
        return "Sorry, flavors for the provided date could not be found."
    }

    let template = _.template("The custard flavors for the <say-as interpret-as='date' format='d'>${date}</say-as> are ${one} and ${two}");

    return template({
        one: data[0],
        two: data[1],
        date: date
    });
};

FlavorDataHelper.prototype.getKoppsHtml = function () {
    let options = {
        method: 'GET',
        uri: ENDPOINT,
        resolveWithFullResponse: true
    };
    return rp(options);
};

FlavorDataHelper.prototype.parseFlavorsForDay = function (html, day) {
    day = day || this.getTodaysDay();

    // day must be two chars long
    if( day < 10 ) {
        day = '0' + day;
    }

    let $ = cheerio.load(html);

    let data = {};
    let dayHtml = $('div', `#${day}`);

    dayHtml.children('h3').each(function (i, el) {
        data[i] = $(el).text();
    });

    return data;
};

module.exports = FlavorDataHelper;
