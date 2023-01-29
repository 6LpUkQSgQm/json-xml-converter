import fs from "fs";
import chalk from "chalk";

const log = console.log;
chalk.level = 1;

const jsonToXml = (config: { input: string; output: string }) => {
  const xml = "";
  console.log(config.input, "config.input");
  /* config.input.forEach((prop, index) => {
      
    xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
  }});
  const xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml; */
};
export default jsonToXml;
