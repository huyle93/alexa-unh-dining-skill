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
                        // A MESS

                        // get today's day
                        var now = new Date();
                        var weekday = new Array(7);
                        weekday[0] = "Sunday";
                        weekday[1] = "Monday";
                        weekday[2] = "Tuesday";
                        weekday[3] = "Wednesday";
                        weekday[4] = "Thursday";
                        weekday[5] = "Friday";
                        weekday[6] = "Saturday";

                        var todayIs = weekday[now.getDay()]; // got day => Thursday

                        // get EST current time
                        function getDateWithUTCOffset(inputTzOffset){
                            var now = new Date(); // get the current time
                        
                            var currentTzOffset = -now.getTimezoneOffset() / 60 // in hours, i.e. -4 in NY
                            var deltaTzOffset = inputTzOffset - currentTzOffset; // timezone diff
                        
                            var nowTimestamp = now.getTime(); // get the number of milliseconds since unix epoch 
                            var deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
                            var outputDate = new Date(nowTimestamp + deltaTzOffsetMilli) // your new Date object with the timezone offset applied.
                        
                            return outputDate;
                        }
                        var myTime = getDateWithUTCOffset(-4);


                        var rawPlace = event.request.intent.slots.dining_hall.value; // => hoco

                        var place = rawPlace.toLowerCase();

                        //var place = "philly"
                        // endpoint stuff
                        var endpoint = `https://s3.amazonaws.com/alexa-unh-dining/data/${place}.json`; // hoco joson
                        // endpoint result
                        var body = "";
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => {
                                body += chunk;
                            });
                            response.on('end', () => {
                                var data = JSON.parse(body);
                                var startTime = data[place][todayIs].Open;
                                var endTime = data[place][todayIs].Close;

                                var startDate = dateObj(startTime); // get date objects
                                var endDate = dateObj(endTime);

                                if (startDate > endDate) { // check if start comes before end
                                    var temp = startDate; // if so, assume it's across midnight
                                    startDate = endDate; // and swap the dates
                                    endDate = temp;
                                }

                                // LOGIC
                                var open = myTime < endDate && myTime > startDate ? 'open' : 'closed'; // compare
                                //console.log('Restaurant is ' + open);
                                
                                // =============== //
                                function dateObj(d) { // date parser ...
                                    var parts = d.split(/:|\s/),
                                        date = new Date();
                                    if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
                                    date.setHours(+parts.shift());
                                    date.setMinutes(+parts.shift());
                                    return date;
                                }

                                // alexa output
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`${place} is ${open}`, true), {}
                                    )
                                );
                            });
                        });
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