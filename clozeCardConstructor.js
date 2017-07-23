var inquirer = require('inquirer');
var fs = require('fs');

var cardData = require('./ClozeCard.json');

function ClozeCard(fullText, answer) {
  var clozePosition = clozeDelete(fullText, answer);

  this.patial = getPartial(fullText, clozePosition);
  this.answer = answer;

  function clozeDelete(fullText, answer) {
    var start = fullText.indexOf(answer);
    if (start !== -1) {
      return [start, start + answer.length];
    }
    throw new Error("could not find answer in fullText");
  }

  function getPartial(fullText, clozePosition) {
    var start = fullText.slice(0, clozePosition[0]);
    var end = fullText.slice(clozePosition[1], fullText.length);
    return start + " ... " + end;
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  console.log(this.patial.replace('...', this.answer));

}

function createNewCard() {
  inquirer.prompt([{
    type: 'input',
    name: 'fullText',
    message: 'What is full text of flash card you want to make?'
  }, {
    type: 'input',
    name: 'answer',
    message: 'What is the anwer to the flash card?'
  }]).then(function(input) {
    var card = new ClozeCard(input.fullText, input.answer);
    card.displayCard();
    cardData.push(card);
    console.log(card);

    // var card = new clozeCard(input.frontSide, input.backSide);
    var newCardData = JSON.stringify(cardData, null, '\t');
    console.log(newCardData);
    fs.writeFile('./ClozeCard.json', newCardData, function(err) {
      if (err) throw err;
      console.log('Done!');
      console.log('answer : ' + input.fullText);
    })
  }).catch(function(err) {
    console.log('OOPS!');
  });
}

createNewCard();
