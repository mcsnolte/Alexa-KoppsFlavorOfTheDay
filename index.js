'use strict';
module.change_code = 1;
let Alexa = require('alexa-app');
let FlavorDataHelper = require('./flavor_data_helper');

let app = new Alexa.app('kopps');

app.launch(function (req, res) {
    let helper = new FlavorDataHelper();
    let prompt = helper.getPrompt();
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('flavor', {
        slots: {
            'DATE': "AMAZON.DATE"
        },
        'utterances': ['{for|what is|what the} {-|DATE} {flavor} {of the day|}']
    },
    function (req, res) {
        let reprompt = 'Ask me for today\'s flavor of the day.';
        let date = "";

        let helper = new FlavorDataHelper();

        try {
            date = new Date(req.slot("DATE")).getDate();
            if (isNaN(date)) {
                throw 'Invalid date';
            }
            if (date < 1 || date > 31) {
                throw 'Invalid date';
            }
            console.log(date);
        }
        catch (error) {
            console.log(error);
            let alexaError = "Sorry, I could not understand the date, please try being more specific.";
            res.say(alexaError).shouldEndSession(true).send();
            return true;
        }

        helper.getKoppsHtml().then(
            function (webResponse) {
                let alexaResponse = helper.formatResponse(helper.parseFlavorsForDay(webResponse.body, date));
                res.say(alexaResponse).shouldEndSession(true).send();
            }
        ).catch(
            function (err) {
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
app.utterances = function () {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
