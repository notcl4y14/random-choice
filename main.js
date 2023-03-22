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
			":h, :help - Show the commands list;",
			":l, :list - Show the list",
			":r, :roll - Get a random option from the list;",
			":c, :clear - Clear the list;",
			":rm, :remove - Remove an option from the list (Just type :rm or :remove);",
			":pop - Remove the last option from the list;",
			":i, :insert - Insert an option into a specific position of the list (Just type :i or :insert);",
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
		console.log("Cleared the list");
	} else if(input == ":rm" || input == ":remove") {
		console.log("==================");
		for(let i = 0; i < choices.length; i += 1) {
			console.log(i + ": " + choices[i]);
		}
		console.log("==================");
		process.stdout.write("Index > ");
		let index = readline.question();

		if(index >= 0 && index <= choices.length) {
			choices.splice(index, 1);
		}

		console.log("Removed an option");
	} else if(input == ":pop") {
		choices.pop();
		console.log("Removed the last option");
	} else if(input == ":i" || input == ":insert") {
		console.log("==================");
		for(let i = 0; i < choices.length; i += 1) {
			console.log(i + ": " + choices[i]);
		}
		console.log("==================");
		process.stdout.write("Index > ");
		let index = readline.question();
		process.stdout.write("Option > ");
		let option = readline.question();

		if(index >= 0 && index <= choices.length) {
			choices.splice(index, 0, option);
		}
	}
	else {
		choices.push(input);
		console.log("Added '" + input + "' to the list. Type ':list' to show it");
	}
}

let main = function() {
	running = true;

	while(running) loop();
}

main();