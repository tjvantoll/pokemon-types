var sound = require("nativescript-sound");
var errorSound = sound.create("~/sounds/success.wav");
var successSound = sound.create("~/sounds/error.mp3");

var dataModule = require("./data");
var data = dataModule.data;
var types = dataModule.types;

// View references
var page;
var attackTypeView;
var defenderTypeView1;
var defenderTypeView2;
var answer000View;
var answer025View;
var answer050View;
var answer100View;
var answer200View;
var answer400View;

// Boolean that determines whether the second defense type is active
var secondDefenderTypeActive;

var attackIndex;
var defenderIndex1;
var defenderIndex2;

var disableAnswers = false;

exports.onNavigatingTo = function(args) {
  page = args.object;

  attackTypeView = page.getViewById("attack-type");
  defenderTypeView1 = page.getViewById("defender-type-1");
  defenderTypeView2 = page.getViewById("defender-type-2");
  answer000View = page.getViewById("answer-000");
  answer025View = page.getViewById("answer-025");
  answer050View = page.getViewById("answer-050");
  answer100View = page.getViewById("answer-100");
  answer200View = page.getViewById("answer-200");
  answer400View = page.getViewById("answer-400");

  changeTypes();
};

exports.answer = function(args) {
  if (disableAnswers) {
    return;
  }

  // Disable answers during processing
  disableAnswers = true;

  var userAnswer = args.object.text.replace("x", "");
  userAnswer = parseFloat(userAnswer);

  var correctAnswer = data[(attackIndex * 18) + defenderIndex1];
  if (secondDefenderTypeActive) {
    correctAnswer = correctAnswer *
      data[(attackIndex * 18) + defenderIndex2]
  }

  var userAnsweredCorrectly = userAnswer == correctAnswer;

  // Color the correct and incorrect answer
  var selectedAnswerView = page.getViewById("answer-" + answerToString(userAnswer));
  selectedAnswerView.backgroundColor = userAnsweredCorrectly ? "green" : "red";
  selectedAnswerView.color = "white";

  if (!userAnsweredCorrectly) {
    var correctAnswerView = page.getViewById("answer-" + answerToString(correctAnswer));
    correctAnswerView.backgroundColor = "green";
    correctAnswerView.color = "white";
    successSound.play();
  } else {
    errorSound.play();
  }

  setTimeout(function() {
    clearAnswers();
    changeTypes();
    disableAnswers = false;
  }, 3000);
};

function randomTypeIndex() {
  return Math.floor((Math.random() * 18));
}

function answerToString(answer) {
  if (answer === 0) {
    return "000";
  } else if (answer === 0.25) {
    return "025";
  } else if (answer === 0.50) {
    return "050";
  } else if (answer === 1) {
    return "100";
  } else if (answer === 2) {
    return "200";
  } else if (answer === 4) {
    return "400";
  }
}

function changeTypes() {
  attackIndex = randomTypeIndex();
  attackTypeView.text = types[attackIndex].name;
  attackTypeView.backgroundColor = types[attackIndex].backgroundColor;
  attackTypeView.color = types[attackIndex].color;

  defenderIndex1 = randomTypeIndex();
  defenderIndex2 = randomTypeIndex();

  defenderTypeView1.text = types[defenderIndex1].name;
  defenderTypeView1.backgroundColor = types[defenderIndex1].backgroundColor;
  defenderTypeView1.color = types[defenderIndex1].color;

  // Hide the second defender button 1/4 of the time, if the two types are the same
  secondDefenderTypeActive =
    (defenderIndex1 != defenderIndex2) && (Math.random() * 4 < 3);
  defenderTypeView2.style.visibility = secondDefenderTypeActive ?
    "visible" : "collapse";

  defenderTypeView2.text = types[defenderIndex2].name;
  defenderTypeView2.backgroundColor = types[defenderIndex2].backgroundColor;
  defenderTypeView2.color = types[defenderIndex2].color;
}

function clearAnswers() {
  answer000View.style.color = "#222";
  answer000View.style.backgroundColor = "#fff";
  answer025View.style.color = "#222";
  answer025View.style.backgroundColor = "#fff";
  answer050View.style.color = "#222";
  answer050View.style.backgroundColor = "#fff";
  answer100View.style.color = "#222";
  answer100View.style.backgroundColor = "#fff";
  answer200View.style.color = "#222";
  answer200View.style.backgroundColor = "#fff";
  answer400View.style.color = "#222";
  answer400View.style.backgroundColor = "#fff";
}