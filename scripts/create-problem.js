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
      path: `./${path}/index.test.js`, content: [
        `import { describe, it, expect } from 'vitest';`,
        `import { input } from './input';`,
        `import { solution } from './solution';`,
        '',
        `describe('Part One', () => {`,
        `\tit('Example', () => {`,
        `\t\tlet example = \`\`;`,
        `\t\texpect(solution(example)).toBe(1);`,
        `\t})`,
        '',
        `\tit('User Puzzle Input', () => {`,
        `\t\texpect(solution(input)).toBe(1);`,
        `\t})`,
        `})`
      ].join('\r')
    },
    { path: `./${path}/input.js`, content: `export const input = \`\`;` },
    { path: `./${path}/README.md`, content: `# ${day} - ${title}` },
    { path: `./${path}/solution.js`, content: `export const solution = (input = '') => {\r\treturn 1;\r}` },
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
