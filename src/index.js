'use strict'
/* -- alexa skill to check unh foods -- */
const Alexa = require('alexa-sdk');
var https = require('https');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            // New Session
            console.log("NEW SESSION")
        }
        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`)
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse('hello', false), {}
                    )
                );
                break;
            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch (event.request.intent.name) {
                    // AMAZON Built-In Intents
                    case "AMAZON.HelpIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse('hello', false), {}
                            )
                        );
                        break;

                    case "AMAZON.StopIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Alright. See you again soon`, true), {}
                            )
                        );
                        break;

                    case "AMAZON.CancelIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Alright. See you again soon`, true), {}
                            )
                        );
                        break;

                    case "AMAZON.PauseIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Ok. I am waiting.`, false), {}
                            )
                        );
                        break;

                    case "AMAZON.ResumeIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`How can I help you? `, false), {}
                            )
                        );
                        break;
                        // Custom Intent
                    case "checkOpen":
                        /*var today = new Date();
                        var est_offSet = -4;
                        var hourNow = today.getHours() + est_offSet;
                        var minuteNow = today.getMinutes();
                        //const currentTime = moment().format('LT');
                         const currentTime = parseFloat(hourNow + "." + minuteNow);

                        var checkOpen = function(currentTime) {
                            if currentTime
                        }; */

                        var startTime = '7:30 AM';
                        var endTime   = '9:30 PM';
                        var now       = new Date();
                        
                        var startDate = dateObj(startTime); // get date objects
                        var endDate   = dateObj(endTime);
                        
                        if (startDate > endDate) { // check if start comes before end
                            var temp  = startDate; // if so, assume it's across midnight
                            startDate = endDate;   // and swap the dates
                            endDate   = temp;
                        }
                        
                        var open = now < endDate && now > startDate ? 'open' : 'closed'; // compare
                        /* console.log('Restaurant is ' + open); */
                        
                        function dateObj(d) { // date parser ...
                            var parts = d.split(/:|\s/),
                                date  = new Date();
                            if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
                            date.setHours(+parts.shift());
                            date.setMinutes(+parts.shift());
                            return date;
                        }

                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Hoco is ${open}`, true), {}
                            )
                        );
                        break;
                    default:
                        throw "Invalid intent";
                }
                break;
            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
        }
    } catch (error) {
        context.fail(`Exception: ${error}`);
    }
    const alexa = Alexa.handler(event, context);
};

// Helpers
var buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };

};

var buildSpeechletResponseSSML = (outputSSML, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "SSML",
            ssml: outputSSML
        },
        shouldEndSession: shouldEndSession
    };

};

var generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };

};