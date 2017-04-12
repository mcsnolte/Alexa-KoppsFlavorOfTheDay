'use strict';
module.change_code = 1;
let Alexa = require('alexa-app');
let FlavorDataHelper = require('./flavor_data_helper');

let app = new Alexa.app('kopps');

app.launch(function(req, res) {
    let helper = new FlavorDataHelper();
    let prompt = helper.getPrompt();
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('todayflavor', {
  'utterances': ['{|the|today\'s} {flavor|flavor\'s} {|of the day}']
},
  function(req, res) {
      let reprompt = 'Ask me for the flavor of the day.';

      let helper = new FlavorDataHelper();

      helper.getKoppsHtml().then(
          function(webResponse) {
              let alexaResponse = helper.formatResponse(helper.parseFlavorsForDay(webResponse.body, helper.getTodaysDay()));
              res.say(alexaResponse).shouldEndSession(true).send();
          }
      ).catch(
          function(err) {
              console.log(err);
              let prompt = 'I couldn\'t retrieve Kopps flavor data, please try again later';
              res.say(prompt).reprompt(reprompt).shouldEndSession(true).send();
          }
      );
      return false;
  }
);

//hack to support custom utterances in utterance expansion string
let utterancesMethod = app.utterances;
app.utterances = function() {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
