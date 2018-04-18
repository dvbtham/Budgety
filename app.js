/*var Person = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
	this.age = function () {
		return 2018 - this.yearOfBirth;
	};
	this.print = function () {
		const message = 
		`
		Name: ${this.name}
		Age: ${this.age()}
		Job: ${this.job}

		`;
		console.log(message);
	}
}

Person.prototype.class = "CT14A1.11";

var tham = new Person("Tham", 1996, ".NET Developer");
var tri = new Person("Tri", 1994, "PHP Developer");
var nhat = new Person("Nhat", 1996, "Java Developer");

tham.print();
tri.print();
nhat.print();

console.log(tham.class);
console.log(tri.class);
console.log(nhat.class);

*/
//	Create an object with Object
/*

*/

// var cat = Object.create(Object.prototype, {

// 	name: {
// 		value: 'Fluffy',
// 		enumerable: true,
// 		writable: true,
// 		configurable: true
// 	},
// 	age: {
// 		value: '18',
// 		enumerable: true,
// 		writable: true,
// 		configurable: true
// 	}
// });

// console.log(cat);


//	get; set; in javascript

// var person = {
// 	name: {
// 		first: "Tham",
// 		last: "David"
// 	},
// 	age: 22
// };

// Object.defineProperty(person, "fullname", {
// 	get: function(){
// 		return this.name.first + " " + this.name.last;
// 	},
// 	set: function(value){
// 		var nameParts = value.split(' ');
// 		this.name.first = nameParts[0];
// 		this.name.last = nameParts[1];
// 	}

// });
// person.fullname = "Tham Davies";
// console.log(person);

// Callback function

/*
var years = [1996, 2003, 1992, 1994];

var arrCal = function (arr, func) {
	var result = [];
	for (let i = 0; i < arr.length; i++) {
		result.push(func(arr[i]));
	}
	return result;
}

var calAge = function (el) {
	return 2018 - el;
}

var isFullAge = function(el){
	return el >= 18;
}

var ages = arrCal(years, calAge);
console.log(ages);

var fullAges = arrCal(ages, isFullAge);
console.log(fullAges);
*/

/// Returning a function.

/*
var askMeAJob = function (job) {
	if (job === 'designer') {
		return function (name) {
			console.log(`${name}, your current job is designer!!!`);
		}
	}
	else
		if (job === 'teacher') {
			return function (name) {
				console.log(`${name}, your current job is teacher!!!`);
			}
		}
		else {
			return function (name) {
				console.log(`What do you do, ${name}?`);
			}
		}
}
var func = askMeAJob("");
func("Lil Pumb");
askMeAJob('teacher')("Tham");
 */

/// IIFE

// function game() {
// 	var score = Math.random() * 10;
// 	console.log(score >= 5);
// 	console.log(score);
// }

//game();

// (function (goodluck) {
// 	var score = Math.random() * 10;
// 	console.log(score >= 5 - goodluck);
// 	console.log(score);
// })(5);

///Closures

// var askMeAJob = function (job) {

// 	return function (name) {
// 		if (job === 'designer') {
// 			console.log(`${name}, your current job is designer!!!`);
// 		} else
// 			if (job === 'teacher') {
// 				console.log(`${name}, your current job is teacher!!!`);
// 			}
// 			else
// 				console.log(`What do you do, ${name}?`);
// 	}
// }

// askMeAJob('teacher')("Tham");

// var Age = (function () {
// 	let mAge = 0;

// 	var calAge = function (val) {
// 		mAge = 2018 - val;
// 	}
// 	return {
// 		calAge: function (age) {
// 			calAge(age);
// 		},
// 		age: () => mAge
// 	};
// })();

// Age.calAge(1996);
// console.log(Age.age());

/// Bind, Call, Apply method.

// var tham = {
// 	name: "Tham Davies",
// 	age: 22,
// 	job: ".NET Web Developer",
// 	speech: function (timeOfDay) {
// 		if (timeOfDay === "morning") {
// 			console.log(`Good moring! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age}.`)
// 		}
// 		else
// 			if (timeOfDay === "afternoon") {
// 				console.log(`Good afternoon! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age}.`)
// 			}
// 			else
// 				if (timeOfDay === "night") {
// 					console.log(`Good night! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age}.`)
// 				}
// 	}
// }

// tham.speech('morning');

// var son = {
// 	name: "Nguyen Hoang Son",
// 	age: 22,
// 	job: "React Native Developer"
// }

// tham.speech.call(son, 'morning');
// tham.speech.apply(son, ['morning']);
// tham.speech.bind(son)('afternoon');

/// Quiz Game

// (function () {
// 	var Question = function (question, answers, correct) {
// 		this.question = question;
// 		this.answers = answers;
// 		this.correct = correct;
// 	}

// 	Question.prototype.displayQuestion = function () {
// 		console.log(this.question);

// 		for (let index = 0; index < this.answers.length; index++) {
// 			console.log(`${index}: ${this.answers[index]}`);
// 		}
// 	}

// 	Question.prototype.displayScore = function (sc) {
// 		console.log("Your current score is " + sc);
// 		console.log("==========================");
// 	}

// 	Question.prototype.checkAnswer = function (ans, callback) {
// 		var sc;
// 		if (ans === this.correct) {
// 			console.log('Correct answer!');
// 			sc = callback(true);

// 		} else {
// 			console.log('Wrong answer. Try again :)');
// 			sc = callback(false);
// 		}
// 		this.displayScore(sc);
// 	}

// 	var q1 = new Question('Is JavaScript the coolest programming language in the world?',
// 		['Yes', 'No'],
// 		0);

// 	var q2 = new Question('What is the name of this course\'s teacher?',
// 		['John', 'Micheal', 'Jonas'],
// 		2);

// 	var q3 = new Question('What does best describe coding?',
// 		['Boring', 'Hard', 'Fun', 'Tediuos'],
// 		2);

// 	var questions = [q1, q2, q3];

// 	function score() {
// 		var sc = 0;
// 		return function (correct) {
// 			if (correct) sc++;
// 			return sc
// 		}
// 	}

// 	var keepScore = score();

// 	function nextQuestion() {
// 		var n = Math.floor(Math.random() * questions.length);

// 		questions[n].displayQuestion();
// 		var answer = prompt('Please select the correct answer.');

// 		if (answer !== 'exit') {
// 			questions[n].checkAnswer(parseInt(answer), keepScore);
// 			nextQuestion();
// 		}
// 		else
// 			console.log("You've scored " + keepScore(false) + " point(s). GAME EXITED!!!");
// 	}

// 	nextQuestion();

// })();
