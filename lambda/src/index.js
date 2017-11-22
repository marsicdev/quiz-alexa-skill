// @ts-check

'use strict';
const Alexa = require('alexa-sdk');

// Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
// Make sure to enclose your value in quotes, like this:  const APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

//=========================================================================================================================================
// Data
//=========================================================================================================================================

const data = [
    { PlayerName: "Thomas Kraft", Position: "Goalkeeper", NationalTeam: "Germany", Age: 29, YearOfBirth: 1988, SquadNumber: 1 },
    { PlayerName: "Peter Pekarík", Position: "Defender", NationalTeam: "Slovakia", Age: 31, YearOfBirth: 1986, SquadNumber: 2 },
    { PlayerName: "Per Ciljan Skjelbred", Position: "Midfielder", NationalTeam: "Norway", Age: 30, YearOfBirth: 1987, SquadNumber: 3 }
]

// This is a list of positive speechcons that this skill will use when a user gets a correct answer.
const speechConsCorrect = ["All righty", "Bam", "Bingo", "Boom", "Bravo", "Cheers", "Dynomite",
    "Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Oh snap", "Phew",
    "Well done", "Whee", "Woo hoo", "Yay"];

// This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.
const speechConsWrong = ["Argh", "Aw man", "Bummer", "D'oh", "Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks",
    "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//=========================================================================================================================================
// Predefined response messages
//=========================================================================================================================================

// Number of questions to be asked in quiz game
const NUMBER_OF_QUIZ_QUESTIONS = 5;

// This is the welcome message for when a user starts the skill without a specific intent.
const WELCOME_MESSAGE = "Welcome to the Hertha Quiz Game! You can ask me about Hertha Football Club and their players, or you can ask me to start a players quiz.  What would you like to do?";

// This is the message a user will hear when they start a quiz.
const START_QUIZ_MESSAGE = `OK.  I will ask you ${NUMBER_OF_QUIZ_QUESTIONS} questions about the Hertha players.`;

// This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
const EXIT_SKILL_MESSAGE = `Thank you for playing the Hertha Quiz Game!  Let's play again soon!`;

// This is the message a user will hear after they ask (and hear) about a specific data element.
const REPROMPT_SPEECH = `Which other player would you like to know about?`;

// This is the message a user will hear when they ask Alexa for help in your skill.
const HELP_MESSAGE = `I know lots of things about the Hertha.  You can ask me about a club history, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?`;

// This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element
function getSpeechDescription(player) {
    let sentence = `${player.PlayerName} is playing at ${player.Position} position. This ${player.Age} years old player is coming from ${player.NationalTeam} national team. His squad number is ${player.SquadNumber}. I've added ${player.PlayerName} to your Alexa app. Which other Hertha player would you like to know about?`;
    return sentence;
}

// Create your quiz questions.
function getQuestion(counter, property, item) {
    return `Here is your ${counter}th question. What is the ${formatCasing(property)} of ${item.PlayerName}?`;
}

// This is the function that returns an answer to your user during the quiz.
function getAnswer(property, item) {
    return `The ${formatCasing(property)} of ${item.PlayerName} is ${item[property]}. `;
}

// This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
// skill when it starts.  This is the response you will receive.
function getBadAnswer(item) {
    return `I'm sorry. ${item} is not something I know very much about in this skill. ${HELP_MESSAGE}`;
}

// This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) {
    return `Your current score is ${score} out of ${counter}. `;
}

// This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) {
    return "Your final score is " + score + " out of " + counter + ". ";
}

//=========================================================================================================================================
// Alexa cards
//=========================================================================================================================================

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
const USE_CARDS_FLAG = false;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) {
    return item.PlayerName;
}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) {
    return "ENTER_YOUR_IMAGE_URL_HERE" + item.SquadNumber + "._TTH_.png";
}

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) {
    return "ENTER_YOUR_IMAGE_URL_HERE" + item.SquadNumber + "._TTH_.png";
}

//=========================================================================================================================================
// Skill Specific Functions
//=========================================================================================================================================

const counter = 0;

const state = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
    "LaunchRequest": function () {
        this.handler.state = state.START;
        this.emitWithState("Start");
    },
    "QuizIntent": function () {
        this.handler.state = state.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function () {
        this.handler.state = state.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.handler.state = state.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(state.START, {
    "Start": function () {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AnswerIntent": function () {
        let item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
            if (USE_CARDS_FLAG) {
                let imageObj = { smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item) };

                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
            } else {
                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
            }
        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
        }

        this.emit(":responseReady");
    },
    "QuizIntent": function () {
        this.handler.state = state.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.PauseIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.emitWithState("Start");
    }
});


const quizHandlers = Alexa.CreateStateHandler(state.QUIZ, {
    "Quiz": function () {
        this.attributes.response = "";
        this.attributes.counter = 0;
        this.attributes.quizscore = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function () {
        if (this.attributes.counter == 0) {
            this.attributes.response = START_QUIZ_MESSAGE + " ";
        }

        const random = getRandom(0, data.length - 1);
        const item = data[random];

        const propertyArray = Object.getOwnPropertyNames(item);
        const property = propertyArray[getRandom(1, propertyArray.length - 1)];

        this.attributes.quizitem = item;
        this.attributes.quizproperty = property;
        this.attributes.counter++;

        const question = getQuestion(this.attributes.counter, property, item);
        const speech = this.attributes.response + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function () {
        let response = "";
        let speechOutput = "";
        const item = this.attributes.quizitem;
        const property = this.attributes.quizproperty

        const correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct) {
            response = getSpeechCon(true);
            this.attributes.quizscore++;
        } else {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes.counter < NUMBER_OF_QUIZ_QUESTIONS) {
            response += getCurrentScore(this.attributes.quizscore, this.attributes.counter);
            this.attributes.response = response;
            this.emitWithState("AskQuestion");
        } else {
            response += getFinalScore(this.attributes.quizscore, this.attributes.counter);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    },
    "AMAZON.RepeatIntent": function () {
        const question = getQuestion(this.attributes.counter, this.attributes.quizproperty, this.attributes.quizitem);
        this.response.speak(question).listen(question);
        this.emit(":responseReady");
    },
    "AMAZON.StartOverIntent": function () {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value) {
    for (let slot in slots) {
        if (slots[slot].value != undefined) {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase()) {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSymbolSpeech(symbol) {
    return `<say-as interpret-as='spell-out'>${symbol}</say-as>`;
}

function getItem(slots) {
    const propertyArray = Object.getOwnPropertyNames(data[0]);
    let value;

    for (let slot in slots) {
        if (slots[slot].value !== undefined) {
            value = slots[slot].value;
            for (let property in propertyArray) {

                const item = data.filter(item => {
                    const prop = item[propertyArray[property]].toString().toLowerCase();
                    const value = slots[slot].value.toString().toLowerCase();
                    return prop === value;
                });

                if (item.length > 0) {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type) {
    let speechCon = "";
    if (type) {
        const correctOutput = speechConsCorrect[getRandom(0, speechConsCorrect.length - 1)];
        return `<say-as interpret-as='interjection'>${correctOutput}!</say-as><break strength='strong'/>`
    } else {
        const incorrectOutput = speechConsWrong[getRandom(0, speechConsWrong.length - 1)]
        return `<say-as interpret-as='interjection'>${incorrectOutput}</say-as><break strength='strong'/>`
    };
}

function formatCasing(key) {
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item) {
    let text = "";
    for (let key in item) {
        text += `${formatCasing(key)}: ${item[key]}\n`;
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
