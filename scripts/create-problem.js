import fs from "fs";
import Readline from "readline";

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const day = await new Promise((resolve) =>
  readline.question("What day is this for ? ", resolve)
);
const title = await new Promise((resolve) =>
  readline.question("What is the title ? ", resolve)
);

const path = `${day}-${title.toLowerCase().split(" ").join("-")}`;

readline.close();

readline.on("close", () => process.exit(0));

if (!fs.existsSync(`./${path}`)) {
  fs.mkdirSync(`./${path}`, { recursive: true });

  const readmeWriteStream = fs.createWriteStream(`./${path}/README.md`);
  readmeWriteStream.write(`# ${day} - ${title}`);
  readmeWriteStream.end();

  const inputWriteStream = fs.createWriteStream(`./${path}/input.js`);
  inputWriteStream.write(`export default \`\`;`);
  inputWriteStream.end();

  const solutionWriteStream = fs.createWriteStream(`./${path}/solution.js`);
  solutionWriteStream.write(`// import input from './input.js';\n\n`);
  solutionWriteStream.write(`const input = \`\`;`);
  solutionWriteStream.end();

  let readmeContents = await new Promise((resolve) =>
    fs.readFile("./README.md", "utf8", (err, data) => resolve(data))
  );
  readmeContents = readmeContents.split("\n");
  const readmePreContents = readmeContents.splice(0, 4);
  readmeContents[
    +day - 1
  ] = `| ${day} | [${title}](./${path}/README.md) | [Solution](./${path}/solution.js)|`;
  readmeContents = [...readmePreContents, ...readmeContents].join("\n");

  await new Promise((resolve) =>
    fs.writeFile(`./README.md`, readmeContents, resolve)
  );
}
