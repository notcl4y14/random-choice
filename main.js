let readline = require("readline-sync");

let running = false;

let choices = [];

let loop = function() {
	let input;

	process.stdout.write("> ");
	input = readline.question();

	if(input == ":q" || input == ":quit") running = false;
	else if(input == ":h" || input == ":help") {
		let list = [
			":q, :quit - Quit the program;",
			":h, :help - Show this list;",
			":r, :roll - Get a random option from the list;",
			":c, :clear - Clear the list;",
			"To add an option to the list, type anything and press Enter"
		]

		for(let i = 0; i < list.length; i += 1) console.log(list[i]);
	} else if(input == ":r" || input == ":roll") {
		let choice = Math.floor(Math.random() * choices.length);

		console.log(choices[choice]);
	} else if(input == ":l" || input == ":list") {
		if(choices.length > 0) {
			console.log("==================");
			for(let i = 0; i < choices.length; i += 1) {
				console.log("- " + choices[i]);
			}
			console.log("==================");
		} else {
			console.log("The list is empty");
		}
	} else if(input == ":c" || input == ":clear") {
		choices = [];
	} else {
		choices.push(input);
		console.log("Added '" + input + "' to the list. Type ':list' to show it");
	}
}

let main = function() {
	running = true;

	while(running) loop();
}

main();