const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;
const inquirer = require("inquirer");

const configFiles: any = {};
const configFolderPath = path.resolve(__dirname);

(async () => {
	const file = await inquirer.prompt([
		{
			type: "input",
			name: "file",
			message: "What is the name of the file you want to convert?",
		},
	]);
	const fileName = file.file.split(".");
	const fileNameWithoutExtension = fileName[0];
	const fileExtension = fileName[1];

	if (fileExtension !== "json") {
		console.log("Please enter a .json file");
		return;
	}

	const fileContents = await readFile(
		path.resolve(configFolderPath, file.file),
		"utf8"
	);

	const fileContentsAsJson = JSON.parse(fileContents);

	const fileContentsAsJsonWithComma = fileContentsAsJson.map(
		(item: any, index: number) => {
			if (index === fileContentsAsJson.length - 1) {
				return `"${item}"`;
			} else {
				return `"${item}",`;
			}
		}
	);

	await writeFile(
		path.resolve(configFolderPath, `${fileNameWithoutExtension}.ts`),
		fileContentsAsJsonWithComma.join("\n")
	);
})();
