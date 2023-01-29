import fs from "fs";
import chalk from "chalk";
import { XMLValidator } from "fast-xml-parser";

const log = console.log;
chalk.level = 1;

const jsonToXmlFunc = (obj: any) => {
  let xml = "";
  for (let prop in obj) {
    xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (let array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += jsonToXmlFunc(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += jsonToXmlFunc(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml;
};
const jsonToXml = (config: { input: string; output: string }) => {
  if (fs.existsSync(config.input)) {
    log(chalk.blue("INFO: ... generate xml file"));
    const obj = JSON.parse(fs.readFileSync(config.input, "utf8"));

    if (!config.output) {
      log(chalk.green("SUCCESS: data generated."));
      return jsonToXmlFunc(obj);
    }
    if (config.output) {
      return fs.writeFile(
        `./${config.output}`,
        `<?xml version="1.0" encoding="UTF-8"?>${jsonToXmlFunc(obj)}`,
        (err) => {
          if (err) {
            log(chalk.red(`ERROR: ${err}`));
          } else {
            log(chalk.green("SUCCESS: file generated."));
            log(chalk.blue("INFO: ... XML validator"));
            const isValidate = XMLValidator.validate(
              `<?xml version="1.0" encoding="UTF-8"?>${jsonToXmlFunc(obj)}`
            );
            if (isValidate) log(chalk.green("SUCCESS: XML validator: OK"));
            else log(chalk.red(`ERROR: XML  validator: ${isValidate}`));
          }
        }
      );
    } else log(chalk.red("ERROR: An error has been occured."));
  } else log(chalk.red("ERROR: File does not exist."));
};
export default jsonToXml;
