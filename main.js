let readline = require("readline-sync");
let filesystem = require("fs");

let running = false;
let choices = [];

let random = function(max) {
	return Math.floor(Math.random() * max);
}

let readInput = function() {
	let input = "";

	process.stdout.write("> ");
	input = readline.question();
	return input;
}

let parseToCommand = function(string) {
	let splitted = string.split(" ");

	let command = {};
	command.name = splitted[0];
	command.args = [];

	for(let i = 1; i < splitted.length; i += 1) {
		command.args.push(splitted[i]);
	}

	return command;
}

let doCommand = function(command) {
	switch (command.name) {
		case ":q":
		case ":quit":
			running = false;
			break;

		case ":h":
		case ":help":
			let list = [
				":q, :quit - Quit the program",
				":h, :help - Show the commands list",
				":l, :list <-i> - Show the list, <-i> shows the indexes",
				":r, :roll - Get a random option from the list",
				":c, :clear <-s> - Clear the list, <-s> clears the screen",
				":rm, :remove <index> - Remove an option from the list (Just type :rm or :remove)",
				":pop, :rmlast - Remove the last option from the list",
				":i, :insert <index> <option> - Insert an option into a specific position of the list (Just type :i or :insert)",
				":save <path> - Save the list into the file",
				":load <path> - Load the list from the file",
				"To add an option to the list, type anything and press Enter"
			]

			for(let i = 0; i != list.length; i++) {
				console.log(list[i]);
			}
			break;

		case ":r":
		case ":roll":
			var index = random(choices.length);
			var choice = choices[index];
			console.log(choice);
			break;

		case ":l":
		case ":list":
			var indexed = command.args[0] == "-i"
			var line = "==================\n";

			if(choices.length == 0) {
				console.log("The list is empty");
				break;
			}

			process.stdout.write(line);
			for(let i = 0; i != choices.length; i += 1) {
				if(indexed) process.stdout.write(i + ": ");
				else process.stdout.write("- ");

				process.stdout.write(choices[i] + "\n");
			}
			process.stdout.write(line);
			break;

		case ":c":
		case ":clear":
			var screen = command.args[0] == "-s"

			if(!screen) {
				console.log("Clear the list? (Y/y to confirm)");
				var input = readline.question();
				if (input !== "Y" && input !== "y")
					break;

				choices = [];
				console.log("Cleared the list");
				break;
			}

			console.clear();
			break;

		case ":rm":
		case ":remove":
			var index = command.args[0];

			if(!index) {
				console.log("The index should be set!");
				break;
			}

			if(!choices[index]) {
				console.log("Index out of range");
				break;
			}

			choices.splice(index, 1);
			console.log("Removed an option");
			break;

		case ":pop":
		case ":rmlast":
			choices.pop();
			console.log("Removed the last option");
			break;

		case ":i":
		case ":insert":
			var index = command.args[0];
			var option = command.args[1];

			if(!index) {
				console.log("The index should be set!");
				break;
			}
			if(!option) {
				console.log("The option should be set!");
				break;
			}
			if (!choices[index]) {
				console.log("Index out of range");
				break;
			}

			choices.splice(index, 0, option);
			break;

		case ":save":
			var path = command.args[0];

			if(!path) {
				console.log("The path should be set!");
				break;
			}

			var options = "";
			for(let i = 0; i !== choices.length; i++) {
				options += choices[i] + "\r\n";
			}

			// Prevent the last new line from being added
			options = options.substring(0, options.length - 2);
			console.log(options);

			try {
				filesystem.writeFileSync(path, options);
			} catch (e) {
				console.error(e);
				break;
			}

			console.log("Saved successfully!");
			break;

		case ":load":
			var path = command.args[0];

			if(!path) {
				console.log("The path should be set!");
				break;
			}

			var file = filesystem.readFileSync(path, "utf-8");
			var options = file.split("\n");

			if (choices.length !== 0) {
				console.log("The current list is not empty. Continue? (Y/y to confirm)");
				const input = readline.question();
				if (input !== "Y" && input !== "y")
					break;
			}

			choices = options;
			console.log("Loaded the list!");
			break;
	}
}

let loop = function() {
	const input = readInput();
	const command = parseToCommand(input);

	if (input[0] === ":") {
		doCommand(command);
		return;
	}

	choices.push(input);
	console.log("Added '" + input + "' to the list. Type ':list' to show it");
}

let main = function() {
	running = true;

	while(running) loop();
}

main();