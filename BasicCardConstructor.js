

var inquirer = require('inquirer');
var fs = require('fs');
// var cards = [];


var cardData = require('./BasicCard.json');
var clozeCard = require('./ClozeCard.json');
console.log(clozeCard);
console.log(cardData);

function BasicCard(frontSide, backSide) {
  this.front = frontSide;
  this.back = backSide;
}

function createNewCard() {
  inquirer.prompt([{
    type: 'input',
    name: 'frontSide',
    message: 'What is the question you want to ask?'
  }, {
    type: 'input',
    name: 'backSide',
    message: 'What is the anwer to the above question?'
  }]).then(function(input) {
    var card = new BasicCard(input.frontSide, input.backSide);
    // var card = new cardData(input.frontSide, input.backSide);
    cardData.push(card);
    console.log('\nFront side: ' + input.frontSide + '\nBack side: ' + input.backSide);

    // var card = new clozeCard(input.frontSide, input.backSide);
    var newCardData = JSON.stringify(cardData, null, '\t');
    console.log(newCardData);

    fs.writeFile('./BasicCard.json', newCardData, function(err) {
      if (err) throw err;
      console.log('Done!');
      // console.log(card);
    })
  }).catch(function(err) {
    console.log('OOPS!');
  });
}

createNewCard();
