let readline = require("readline-sync");
let filesystem = require("fs");

let running = false;
let choices = [];

let loop = function() {
	let input;

	process.stdout.write("> ");
	input = readline.question();

	// splitting a user input into the name and the arguments
	let splitted = input.split(" ");

	let command = {};
	command.name = splitted[0];
	command.args = [];

	for(let i = 1; i < splitted.length; i += 1) {
		command.args.push(splitted[i]);
	}

	// checking command name
	if(command.name == ":q" || command.name == ":quit") running = false;
	else if(command.name == ":h" || command.name == ":help") {
		let list = [
			":q, :quit - Quit the program",
			":h, :help - Show the commands list",
			":l, :list <-i> - Show the list, <-i> shows the indexes",
			":r, :roll - Get a random option from the list",
			":c, :clear <-s> - Clear the list, <-s> clears the screen",
			":rm, :remove <index> - Remove an option from the list (Just type :rm or :remove)",
			":pop - Remove the last option from the list",
			":i, :insert <index> <option> - Insert an option into a specific position of the list (Just type :i or :insert)",
			":save <path> - Save the list into the file",
			":load <path> - Load the list from the file",
			"To add an option to the list, type anything and press Enter"
		]

		for(let i = 0; i < list.length; i += 1) console.log(list[i]);
	} else if(command.name == ":r" || command.name == ":roll") {
		let choice = Math.floor(Math.random() * choices.length);

		console.log(choices[choice]);
	} else if(command.name == ":l" || command.name == ":list") {
		let indexed = command.args[0] == "-i"
		if(choices.length > 0) {
			console.log("==================");
			for(let i = 0; i < choices.length; i += 1) {
				if(indexed) process.stdout.write(i + ": ");
				if(!indexed) process.stdout.write("- ");

				process.stdout.write(choices[i]);
				console.log();
			}
			console.log("==================");
		} else {
			console.log("The list is empty");
		}
	} else if(command.name == ":c" || command.name == ":clear") {
		let screen = command.args[0] == "-s"
		if(!screen) {
			choices = [];
			console.log("Cleared the list");
		} else if(screen) {
			console.clear();
		}
	} else if(command.name == ":rm" || command.name == ":remove") {
		let index = command.args[0] || null

		// The ability to set the parameters without the arguments in one line is temporarily disabled due to some kind of "bug" that calls an error
		if(index == null) {
			console.log("The index should be set!");
		} else if(index != null) {
			if(index >= 0 && index <= choices.length) {
				choices.splice(index, 1);
			}

			console.log("Removed an option");
		}
	} else if(command.name == ":pop") {
		choices.pop();
		console.log("Removed the last option");
	} else if(command.name == ":i" || command.name == ":insert") {
		let index = command.args[0];
		let option = command.args[1];

		// The ability to set the parameters without the arguments in one line is temporarily disabled due to some kind of "bug" that calls an error
		if(index == null || option == null) {
			if(index == null) console.log("The index should be set!");
			if(option == null) console.log("The option should be set!");
		} else if(index != null && option != null) {
			if(index >= 0 && index <= choices.length) {
				choices.splice(index, 0, option);
			}
		}
	} else if(command.name == ":save") {
		let path = command.args[0];

		if(path == null) {
			console.log("The path should be set!");
		} else if(path != null) {
			let options = "";
			for(let i = 0; i < choices.length; i += 1) {
				options += choices[i] + "\r\n";
			}

			filesystem.writeFileSync(path, options);
		}
	} else if(command.name == ":load") {
		let path = command.args[0];

		if(path == null) {
			console.log("The path should be set!");
		} else if(path != null) {
			let file = filesystem.readFileSync(path, "utf-8");
			let options = file.split("\n");
			choices = options;
			console.log("Loaded the list!");
		}
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