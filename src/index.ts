#!/usr/bin/env node

import jsonToXml from "./jsonToXml";

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const program = require("commander");

clear();
console.log(
  chalk.magenta(
    figlet.textSync("json xml converter", {
      font: "Rectangles",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
    })
  )
);

program
  .version("1.0.0")
  .description("A CLI to convert json file to xml file")
  .option("-f, --file <type>", "Open specified file")
  .option("-o, --output <type>", "Output file path")
  .parse(process.argv);

const options = program.opts();

if (options.file) console.log(`${options.file}  - file`);
if (options.output) console.log(`${options.output}  - output`);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

if (options.file) jsonToXml({ input: options.file, output: options.output });
