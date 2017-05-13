'use strict';
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let FlavorDataHelper = require('../flavor_data_helper');
chai.config.includeStack = true;

let mockDataObj = require('./mock_data');

describe('FlavorDataHelper', function() {
  let subject = new FlavorDataHelper();
    describe('#formatResponse', function() {
        context('with parsed data...', function() {
            let value = "";
            it('returns proper voice template', function() {
                value = subject.formatResponse(mockDataObj.data, 4);
                return expect(value).to.eq("The custard flavors for the <say-as interpret-as='date' format='d'>4</say-as> are Butter Pecan and Cherry Cycle");
            });
        });
    });

    describe('#parseTodayFlavors', function() {
        context('with a request', function() {
            let value = "";
            it('returns the flavor of the day', function() {
                let data = subject.parseFlavorsForDay(mockDataObj.html, 4);
                value = data['0'] + " " + data['1'];

                return expect(value).to.eq("Butter Pecan Cherry Cycle");
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
