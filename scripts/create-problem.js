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

const writeFile = (path, content) => {
  const writeStream = fs.createWriteStream(path);
  writeStream.write(content);
  writeStream.end();
}

readline.close();

readline.on("close", () => process.exit(0));

if (!fs.existsSync(`./${path}`)) {
  fs.mkdirSync(`./${path}`, { recursive: true });

  const files = [
    {
      path: `./${path}/index.test.js`, content:
        `import { describe, it, expect } from 'vitest';
import { example1, example2, input } from './input';
import { solution } from './solution';

describe('Part One', () => {
  it('Example', () => {
    expect(solution(example1)).toBe(1);
  })

  it('User Puzzle Input', () => {
    expect(solution(input)).toBe(1);
  })
})`
    },
    { path: `./${path}/input.js`, content: `export const example1 = \`\`;\rexport const example2 = \`\`;\rexport const input = \`\`;` },
    {
      path: `./${path}/parseInput.js`, content: `export const parseInput = (input = '') => {
  
}`},
    { path: `./${path}/README.md`, content: `# ${day} - ${title}` },
    {
      path: `./${path}/solution.js`, content: `import { parseInput } from "./parseInput";
export const solution = (input = '') => {
  // parse input
  input = parseInput(input);
  
  return 1;
}` },
  ]

  files.map((file) => {
    writeFile(file.path, file.content)
  })

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
