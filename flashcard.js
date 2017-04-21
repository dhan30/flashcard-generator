
// REQUIRE NPM PACKAGES
var inquirer = require('Inquirer');
var fs = require('fs');




// BASIC CARD OBJECT 

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

function ClozeCard(full, cloze, partial) {
	this.full = full;
	this.cloze = cloze;
	this.partial = partial;
	
}

//PROTOYPES FOR BasicCard constructor -----------------------------------------------------
BasicCard.prototype.printQuest = function () {
	 console.log("Congrats! You've just made your first flashcard!!" +
				"\n *Card#1----------------------------------" + 
				"\n Front: " + this.front + "\n Back: " + this.back + 
				"\n *Card#1----------------------------------");

}

BasicCard.prototype.printSec = function () {
	console.log("\n *Card#----------------------------------" + 
				"\n Front: " + this.front + "\n Back: " + this.back + 
				"\n *Card#----------------------------------");
}

//PROTOYPES FOR ClozeCard constructor ------------------------------------------------------

ClozeCard.prototype.printCloze = function () {
	console.log("\nClozeCard#-------------------------------" + "\nHere is your full text: " + this.full + "\nThis is your cloze deletion for this sentence: " + this.cloze + 
		 		"\nPartial: " + this.partial + "\nClozeCard#1-------------------------------");

}


// START APPLICATION FUNCTION ---------------------------------------------------------------

var makeQuestions = function () {
	
	// USE INQUIRER NPM
	
	inquirer.prompt([
	{
		name: "name",
		message: "Hi how are you! What type of cards would you like to make today?"
	}
	]).then(function(answers) {
		// STORE ANSWER VALUE TO A VARIABLE
		var userInput = answers.name;
		// IF USER SELECTS BASIC ------------------------------------------------
		if (userInput === "basic"){
			console.log("basic");
			
			//USE INQUIRER NPM TO CREATE FRONT/BACK CARD
			inquirer.prompt([{
				name: "front",
				message: "Sounds like a plan! What did you want to write on front of the card:"
			}, {
				name: "back",
				message: "How about the back of the card:"

			}

			]).then(function(answers) {
				// console.log(answers);

				fs.readFile('./cards.json', 'utf-8', function(err, data) {
					if (err) throw err

						var arrayCards = JSON.parse(data);
						arrayCards.front.push(answers.front);
						arrayCards.back.push(answers.back);
						console.log(arrayCards);
				})// fs readFile


				// USE CONSTRUCTOR TO CREATE CARD AND OUTPUT
				var newCard = new BasicCard(answers.front, answers.back);
				newCard.printQuest();
				// CREATE SECOND CARD
				var secondCard = new BasicCard("Assasin who shot President Lincoln", "John Wilkes Booth");
				 
				secondCard.printSec();
				// CREATE THIRD CARD
				var thirdCard = new BasicCard("Lost his wife and Mother on the Same valentine's Day", "Theodore Roosevelt");
				
				thirdCard.printSec();

			})// second answers
			
		}// first "if"
		// IF USER SELECTS CLOZE -----------------------------------------------
		if (userInput === "cloze"){
			console.log("cloze");

			inquirer.prompt([
			{
				name: "full",
				message: "What would you like your full text to be?"
		 	}, {
		 		name: "cloze",
		 		message: "Which part is the cloze deletion?"
		 	}, {
		 		name: "partial",
		 		message: "Write the partial sentence"
		 	}
		 	]).then(function(answers) {
		 		// CREATE CONSTRUCTOR AND PRINT CARD
		 		var newCloze = new ClozeCard(answers.full, answers.cloze, answers.partial);

		 		newCloze.printCloze();

		 		// CREATE NEW CLOZECARD
		 		var newClozeTwo = new ClozeCard("George Washington is the first president of the United States of America", "George Washington", " is the first president of the United States of America");

		 		newClozeTwo.printCloze();

		 		

		 })// third answers

		};// second "if"


	})// first answers
}

// CALL THE FUNCTION
makeQuestions();














