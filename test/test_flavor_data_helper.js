'use strict';
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let FlavorDataHelper = require('../flavor_data_helper');
chai.config.includeStack = true;

describe('FlavorDataHelper', function() {
  let subject = new FlavorDataHelper();
    describe('#getKoppsHtml', function() {
        context('with a request', function() {
            let value = false;
            it('returns html', function() {
                value = subject.getKoppsHtml().then(function() {
                    return true;
                });
                return expect(value).to.eventually.eq(true);
            });
        });
    });

    describe('#parseTodayFlavors', function() {
        context('with a request', function() {
            let value = "";
            it('returns the flavor of the day', function() {
                value = subject.getKoppsHtml().then(function(html) {
                    let data = subject.parseFlavorsForDay(html.body, subject.getTodaysDay());
                    return data[0] + " " + data[1];
                });
                return expect(value).to.eventually.eq("Cookies 'N Cream Strawberry Cheesecake");
            });
        });
    });

    describe('#getTodaysDay', function() {
        context('with a request', function() {
            let date = new Date(Date.now());
            let value = "";
            it('returns the correct day of the month', function() {
                value = subject.getTodaysDay();
                return expect(value).to.eq(date.getDate());
            });
        });
    });
});
