'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var FlavorDataHelper = require('../flavor_data_helper');
chai.config.includeStack = true;

describe('FlavorDataHelper', function() {
  var subject = new FlavorDataHelper();
  describe('#getHtml', function() {
    context('with a request', function() {
      var value = false;
      it('returns html', function() {
        value = subject.getHtml().then(function() {
          return true;
        });
        return expect(value).to.eventually.eq(true);
      });
    });
  });

    describe('#getFlavor', function() {
        context('with a request', function() {
            var value = "";
            it('returns the flavor of the day', function() {
                value = subject.getHtml().then(function(html) {
                    var data = subject.getFlavor(html.body);
                    return data.one + " " + data.two;
                });
                return expect(value).to.eventually.eq("Cookies 'N Cream Strawberry Cheesecake");
            });
        });
    });
});
