'use strict';
module.change_code = 1;
var Alexa = require('alexa-app');
var FlavorDataHelper = require('./flavor_data_helper');

var app = new Alexa.app('icecreamflavor');

app.launch(function(req, res) {
  var prompt = "For the flavor of the day, ask me for the flavor of the day.";
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('icecreamflavor', {
  'utterances': ['{for the flavor of the day}']
},
  function(req, res) {
      var reprompt = 'Ask me for the flavor of the day.';

      var flavor = new FlavorDataHelper();

      flavor.requestFlavor().then(function(body) {
          var response = flavor.formatResponse(flavor.getFlavor(body));
          console.log(response);
          res.say(response).send();
      }).catch(function(err) {
          console.log(err.statusCode);
          var prompt = 'I couldn\'t reach the flavor data, please try again later';
          res.say(prompt).reprompt(reprompt).shouldEndSession(true).send();
      });
      return false;
  }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
