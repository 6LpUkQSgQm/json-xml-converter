"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var fast_xml_parser_1 = require("fast-xml-parser");
var log = console.log;
chalk_1.default.level = 1;
var jsonToXmlFunc = function (obj) {
    var xml = "";
    for (var prop in obj) {
        xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += "<" + prop + ">";
                xml += jsonToXmlFunc(new Object(obj[prop][array]));
                xml += "</" + prop + ">";
            }
        }
        else if (typeof obj[prop] == "object") {
            xml += jsonToXmlFunc(new Object(obj[prop]));
        }
        else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
    return xml;
};
var jsonToXml = function (config) {
    if (fs_1.default.existsSync(config.input)) {
        log(chalk_1.default.blue("INFO: ... generate xml file"));
        var obj_1 = JSON.parse(fs_1.default.readFileSync(config.input, "utf8"));
        if (!config.output) {
            log(chalk_1.default.green("SUCCESS: data generated."));
            return jsonToXmlFunc(obj_1);
        }
        if (config.output) {
            return fs_1.default.writeFile("./".concat(config.output), "<?xml version=\"1.0\" encoding=\"UTF-8\"?>".concat(jsonToXmlFunc(obj_1)), function (err) {
                if (err) {
                    log(chalk_1.default.red("ERROR: ".concat(err)));
                }
                else {
                    log(chalk_1.default.green("SUCCESS: file generated."));
                    log(chalk_1.default.blue("INFO: ... XML validator"));
                    var isValidate = fast_xml_parser_1.XMLValidator.validate("<?xml version=\"1.0\" encoding=\"UTF-8\"?>".concat(jsonToXmlFunc(obj_1)));
                    if (isValidate)
                        log(chalk_1.default.green("SUCCESS: XML validator: OK"));
                    else
                        log(chalk_1.default.red("ERROR: XML  validator: ".concat(isValidate)));
                }
            });
        }
        else
            log(chalk_1.default.red("ERROR: An error has been occured."));
    }
    else
        log(chalk_1.default.red("ERROR: File does not exist."));
};
exports.default = jsonToXml;
