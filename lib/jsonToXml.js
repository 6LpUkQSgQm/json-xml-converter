"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var log = console.log;
chalk_1.default.level = 1;
var jsonToXml = function (config) {
    var xml = "";
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
exports.default = jsonToXml;
