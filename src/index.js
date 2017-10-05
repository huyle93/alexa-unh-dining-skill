'use strict'
/* -- alexa skill to check unh foods -- */
const Alexa = require('alexa-sdk')
var https = require('https')

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
                )
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
                        )
                        break;

                    case "AMAZON.StopIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Alright. See you again soon`, true), {}
                            )
                        )
                        break;

                    case "AMAZON.CancelIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Alright. See you again soon`, true), {}
                            )
                        )
                        break;

                    case "AMAZON.PauseIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Ok. I am waiting.`, false), {}
                            )
                        )
                        break;

                    case "AMAZON.ResumeIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`How can I help you? `, false), {}
                            )
                        )
                        break;
                        // Custom Intent
                    case "checkOpen":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse('Currently Hoco is open, but you would expect shitty foods because they are almost close. You have 15 minutes to avoid starving until morning', true), {}
                            )
                        )
                        break;
                    default:
                        throw "Invalid intent"
                }
                break;
            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
        }
    } catch (error) {
        context.fail(`Exception: ${error}`)
    }
    const alexa = Alexa.handler(event, context);
}

// Helpers
var buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

var buildSpeechletResponseSSML = (outputSSML, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "SSML",
            ssml: outputSSML
        },
        shouldEndSession: shouldEndSession
    }

}

var generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}