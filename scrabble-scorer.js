// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

   console.log("Let's play some scrabble!");
   let word =input.question("\nEnter a word to score:");

   return word;
};

function simpleScorer(word){

   return word.length
}

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer

};

function vowelBonusScorer(word) {

   const vowels = ['a', 'e', 'i', 'o', 'u'];
   let letterPoints = 0;
   word = word.toLowerCase();

   for (let i = 0; i < word.length; i++) {

      if (vowels.includes(word[i])) {
         letterPoints = letterPoints + 3;
      }
      else
         letterPoints++;
   }

   return letterPoints;
}

let vowelBonusScore = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer

};

function scrabbleScorer(word){

   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in newPointStructure) {
         
         if (word[i]==pointValue) {
            
            letterPoints =letterPoints+parseInt(newPointStructure[pointValue]);

         }

      }
   }
   return letterPoints;
}

let scrabbleScore = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore,vowelBonusScore,scrabbleScore];

function scorerPrompt() {

   console.log("\nWhich Scoring Algoritham would you like to Use\n0 - Simple : One point per charecter");
   console.log("1 - Vowel Bonus : Vowels are worth 3 points");
   console.log("2 - Scrabble : Uses Scrabble point system");
   let option;

   do {
      option = parseInt(input.question("Enter 0, 1, or 2: "));

      if (option !== 0 && option !== 1 && option !== 2) {
         console.log("\nInvalid Option! Choose a valid option.");
      }
      
   } while (option !== 0 && option !== 1 && option !== 2);

   return scoringAlgorithms[option];
}

function transform(oldStructure) {

   let newPointStructure = {};
      
   for (item in oldStructure) {
      
      for(i=0;i< oldPointStructure[item].length;i++)
        
      newPointStructure[oldPointStructure[item][i].toLowerCase()] = parseInt(item);
   }

   //newPointStructure[''] =parseInt(0);
   
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {

   let userWord=initialPrompt();
   let userOption = scorerPrompt();
   console.log("Score for","'",userWord,"'",":",userOption.scorerFunction(userWord));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
