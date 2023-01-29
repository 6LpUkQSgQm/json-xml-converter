import fs from "fs";
import { XMLValidator } from "fast-xml-parser";

describe("excelToJson.ts", () => {
  it("1.fs file exist", () => {
    const val = fs.existsSync("./src/test/file.json");
    expect(val).toBe(true);
  });
  it("2.fs file doesn't exist", () => {
    const val = fs.existsSync("./error-path/test.json");
    expect(val).toBe(false);
  });
  it("3.xml validator", () => {
    const xmlData = fs.readFileSync("./src/test/file.xml", "utf8");
    const isValidate = XMLValidator.validate(xmlData);
    expect(isValidate).toBe(true);
  });
});
