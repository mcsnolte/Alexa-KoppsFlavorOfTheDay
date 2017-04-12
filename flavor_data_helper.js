'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var cheerio = require('cheerio');
var ENDPOINT = 'https://www.kopps.com/flavor-forecast';

function FlavorDataHelper() { }

FlavorDataHelper.prototype.requestFlavor = function() {
  return this.getHtml().then( function(response) {
      return response.body;
  });
};

FlavorDataHelper.prototype.formatResponse = function(json) {
    var template = _.template("Today's flavors are ${one} and ${two}");

    return template({
        one: json.one,
        two: json.two
    });
};

FlavorDataHelper.prototype.getHtml = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    resolveWithFullResponse: true
    // json: true
  };
  return rp(options);
};

FlavorDataHelper.prototype.getFlavor = function(html) {
    var $ = cheerio.load(html);

    var json = {one: "", two: "" };

    // index 2 and 3 are the first (today) flavors
    // 0 and 1 are the shake and sundae
    json.one = $('h3').eq(2).text();
    json.two = $('h3').eq(3).text();
    return json;
};

module.exports = FlavorDataHelper;
