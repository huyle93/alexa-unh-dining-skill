'use strict'
/* -- alexa skill to check unh foods -- */

/*
ES6
.jshintrc eversion 6 is preferred
none semicolons needed
*/

/*
debug
https://alexa.amazon.com/spa/index.html#cards
*/

// ======================== Require from Alexa npm ======================= //
const Alexa = require('alexa-sdk');
var https = require('https');

// ======================== Export Handler ======================= //

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
                        buildSpeechletResponse('Welcome to UNH Food Hunter! You can ask me for current opening dining hall, check a specific dining hall operating hours, or find a specific food by providing the food name and dining hall name', false), {}
                    )
                );
                break;
            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch (event.request.intent.name) {
                    // ======================== Amazon Intents ======================= //
                    case "AMAZON.HelpIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse('How can I help you? You can ask for a specific dining hall opening, or, a specific food. ', false), {}
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
                    case "AMAZON.YesIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Please tell me the foods name!`, false), {}
                            )
                        );
                        break;
                    case "AMAZON.NoIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Alright, see ya`, true), {}
                            )
                        );

                        // ======================== Custom Intents ======================= //
                    case "demoCheckOpen":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`All three dining halls, Hoco, Philly and Stillings are currently open. Do you want to find a specific food?`, false), {}
                            )
                        );
                        break;
                    case "didNotUnderstand":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Woo, I did not hear it clear. Can you say it again? `, false), {}
                            )
                        );
                        break;
                    case "checkFood":
                        // alexa, ask food hunter do we have {fresh clam chowder} today
                        // alexa: Yey, we do have {fresh clam chowder} today at philly for lunch and dinner. Enjoy!
                        var foodname_slot = event.request.intent.slots.Food.value.toLowerCase(); // fresh clam chowder
                        var menu_date = event.request.intent.slots.Date.value;
                        // confirmation //
                        var confirmationArray = ["hoco", "holloway", "holloway common", "philly", "philbrook", "stillings"]
                        // ====== get dining hall ====== //
                        var rawPlace_checkFood = event.request.intent.slots.dining_hall.value;
                        if (rawPlace_checkFood === undefined) {
                            rawPlace_checkFood = "hoco" // working now by replacing undefined with hoco, better way is to loop through all object and return object that has specific food and time.
                        } else {
                            rawPlace_checkFood.toLowerCase()
                        }
                        var dining_hall_for_menu = getDiningHall_fromUser(rawPlace_checkFood)[1];
                        var dining_hall_speech = getDiningHall_fromUser(rawPlace_checkFood)[0];
                        // endpoint for demo
                        var s3_menu_endpoint = `https://s3.amazonaws.com/alexa-unh-dining/data/api-request/${menu_date}.json` //yyyy-mm-dd
                        // logic
                        var menu_body = "";
                        if (menu_date === undefined || s3_menu_endpoint === null) {
                            s3_menu_endpoint = `https://s3.amazonaws.com/alexa-unh-dining/data/api-request/2017-12-08.json`
                        }
                        https.get(s3_menu_endpoint, (response) => {
                            response.on('data', (chunk) => {
                                menu_body += chunk;
                            });
                            response.on('end', () => {
                                var data = JSON.parse(menu_body);
                                var foodname_endpoint = data[dining_hall_for_menu];
                                var meal = getFoodTime(foodname_slot, foodname_endpoint)
                                if (meal == "") {
                                    context.succeed(
                                        generateResponse(
                                            buildSpeechletResponse(`Oh No, we dont have ${foodname_slot} today. Do you want to find another food?`, false), {}
                                        )
                                    );
                                } else {
                                    context.succeed(
                                        generateResponse(
                                            buildSpeechletResponse(`Yes. There is ${foodname_slot} in ${dining_hall_speech}, at ${meal}. I hope you enjoy it`, true), {}
                                        )
                                    );
                                }
                            });
                        });
                        break;
                    case "checkOpen":
                        // confirmation //
                        var confirmationArray_1 = ["hoco", "holloway", "holloway common", "philly", "philbrook", "stillings"]
                        // ====== get dining hall ====== //
                        var rawPlace_checkOpen = event.request.intent.slots.dining_hall.value;

                        if (confirmationArray_1.indexOf(rawPlace_checkOpen.toLowerCase()) >= 0) {
                            var speechPlace = getDiningHall_fromUser(rawPlace_checkOpen)[0];
                            var strLocation_checkOpen = getDiningHall_fromUser(rawPlace_checkOpen)[1];
                            // ====== get today day ====== //
                            var todayIs = getCurrentDay()
                            // ====== get current EST time ====== //
                            var myTime = getDateWithUTCOffset(-5);
                            //////////////////////////////////////
                            // ****** endpoint services ****** //
                            // ====== get data from REST API AWS S3 ====== //
                            var body = "";
                            var s3_speechPlace_endpoint = `https://s3.amazonaws.com/alexa-unh-dining/data/${strLocation_checkOpen}.json`;
                            https.get(s3_speechPlace_endpoint, (response) => {
                                response.on('data', (chunk) => {
                                    body += chunk;
                                });
                                response.on('end', () => {
                                    var data = JSON.parse(body);
                                    // ====== accessing JSON key ====== //
                                    var startTime = data[strLocation_checkOpen][todayIs].Open;
                                    var endTime = data[strLocation_checkOpen][todayIs].Close;
                                    // ====== convert RAW JSON value to date Obj ====== //
                                    var startDate = dateObj(startTime);
                                    var endDate = dateObj(endTime);
                                    // ====== validate startDate and endDate ====== //
                                    if (startDate > endDate) { // check if start comes before end
                                        var temp = startDate; // if so, assume it's across midnight
                                        startDate = endDate; // and swap the dates
                                        endDate = temp;
                                    }
                                    // ====== logic comparing return str ====== //
                                    var open = myTime < endDate && myTime > startDate ? 'open' : 'closed';

                                    // alexa output
                                    context.succeed(
                                        generateResponse(
                                            buildSpeechletResponse(`${speechPlace} is currently ${open}`, true), {}
                                        )
                                    );
                                });
                            });
                        } else {
                            // alexa output
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`The location is invalid, please say it again`, false), {}
                                )
                            );
                        }

                        break;
                    case "checkTime":
                        // confirmation //
                        var confirmationArray_2 = ["hoco", "holloway", "holloway common", "philly", "philbrook", "stillings"]
                        // ====== get dining hall ====== //
                        var rawPlace_checkTime = event.request.intent.slots.dining_hall.value;
                        var date_value_checkTime = event.request.intent.slots.Date.value;
                        if (confirmationArray_2.indexOf(rawPlace_checkTime.toLowerCase()) >= 0) {
                            //////////////////////////////////////
                            var strLocation_checkTime = getDiningHall_fromUser(rawPlace_checkTime)[1];
                            // ****** endpoint services ****** //
                            // ====== get data from REST API AWS S3 ====== //
                            var body_2 = "";
                            var s3_operationTime_endpoint = `https://s3.amazonaws.com/alexa-unh-dining/data/${strLocation_checkTime}.json`;
                            https.get(s3_operationTime_endpoint, (response) => {
                                response.on('data', (chunk) => {
                                    body_2 += chunk;
                                });
                                response.on('end', () => {
                                    var data = JSON.parse(body_2);
                                    // ====== get today day ====== //
                                    var todayIs = getCurrentDay()
                                    // ====== accessing JSON key ====== //
                                    var startTime = data[strLocation_checkTime][todayIs].Open;
                                    var endTime = data[strLocation_checkTime][todayIs].Close;
                                    // alexa output
                                    if (date_value_checkTime == "2017-12-09") {
                                        context.succeed(
                                            generateResponse(
                                                buildSpeechletResponse(`${strLocation_checkTime} is open at ${startTime} and close at ${endTime} tomorrow`, true), {}
                                            )
                                        );
                                    } else {
                                        context.succeed(
                                            generateResponse(
                                                buildSpeechletResponse(`${strLocation_checkTime} is open at ${startTime} and close at ${endTime} today`, true), {}
                                            )
                                        );
                                    }
                                });
                            });
                        } else {
                            // alexa output
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`The location is invalid, please say it again`, false), {}
                                )
                            );
                        }
                        break;
                    default:
                        throw "Invalid intent";
                }
                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`);
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
        }
    } catch (error) {
        context.fail(`Exception: ${error}`)
    }
    const alexa = Alexa.handler(event, context);
}

// ======================== Helpers ======================= //
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

// ======================== Custom functions ======================= //
// function to get current EST time from UTC
var getDateWithUTCOffset = function (inputTzOffset) {
    var now = new Date(); // get the current time

    var currentTzOffset = -now.getTimezoneOffset() / 60 // in hours, i.e. -4 in NY
    var deltaTzOffset = inputTzOffset - currentTzOffset; // timezone diff

    var nowTimestamp = now.getTime(); // get the number of milliseconds since unix epoch 
    var deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
    var outputDate = new Date(nowTimestamp + deltaTzOffsetMilli) // your new Date object with the timezone offset applied.

    return outputDate;
}

// function converts raw str date to JS Date Obj
function dateObj(d) {
    const rx = /(\d{1,2})\:(\d{1,2})\s*(AM|PM)/g
    // Make sure JSON is in uppercase format like 7:00 AM
    const parts = rx.exec(d)
    if (parts === null) {
        return "Not a valid date: " + d;
    }
    var date = getDateWithUTCOffset(-5);
    if (parts.pop().toLowerCase() == 'pm') {
        parts[1] = (+parts[1]) + 12;
    }
    date.setHours(parts[1]);
    date.setMinutes(parts[2]);
    return date;
}
// function to get dining hall from user input and return correct dining hall
function getDiningHall_fromUser(value) {
    // ====== get dining hall ====== //
    var place = value.toLowerCase();
    var place_pool = {
        "holloway": ["holloway", "holloway commons", "hoco"],
        "philbrook": ["philbrook", "philly"],
        "stillings": ["stilings", "stilling", "stillings"]
    };
    // filter
    var speechPlace;
    var operation_time;
    if (place_pool.holloway.indexOf(place) >= 0) {
        speechPlace = "holloway common dining hall";
        operation_time = "hoco";
    }
    if (place_pool.philbrook.indexOf(place) >= 0) {
        speechPlace = "philbrook dining hall";
        operation_time = "philly";
    }
    if (place_pool.stillings.indexOf(place) >= 0) {
        speechPlace = "stillings dining hall";
        operation_time = "stillings";
    }
    return [speechPlace, operation_time]
}
// function to get today day
function getCurrentDay() {
    // ====== get today day ====== //
    var now = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var todayIs = weekday[now.getDay()];
    return todayIs;
}
// function to search regex
Array.prototype.findReg = function (match) {
    var reg = new RegExp(match);

    return this.filter(function (item) {
        return typeof item == 'string' && item.match(reg);
    });
};
// lowerCase array of foods
function toLowerCaseArray(takeArray) {
    var sorted = [];
    for (var i = 0; i < takeArray.length; i++) {
        sorted.push(takeArray[i].toLowerCase());
    }
    return sorted.sort();
}
// function get food time
/* take 2 parameters, return array of meal time */
function getFoodTime(foodname_slot, takeObject) {
    var hasFoodOn = [];
    foodname_slot.toLowerCase();
    if (toLowerCaseArray(takeObject.Breakfast).findReg(foodname_slot) == foodname_slot) {
        hasFoodOn.push(Object.keys(takeObject)[0]);
    }
    if (toLowerCaseArray(takeObject.Lunch).findReg(foodname_slot) == foodname_slot) {
        hasFoodOn.push(Object.keys(takeObject)[1]);
    }
    if (toLowerCaseArray(takeObject.Dinner).findReg(foodname_slot) == foodname_slot) {
        hasFoodOn.push(Object.keys(takeObject)[2]);
    }
    return hasFoodOn;
}