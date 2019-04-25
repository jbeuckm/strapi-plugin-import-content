const fieldUtils = require("./fieldUtils");

describe("detectStringFieldFormat", () => {
  it("detects a date string", () => {
    const dateString = new Date().toString();
    const result = fieldUtils.detectStringFieldFormat(dateString);
    expect(result).toEqual("date");
  });
});

describe("detectFieldFormat", () => {
  it("detects a number", () => {
    const result = fieldUtils.detectFieldFormat(1);
    expect(result).toEqual("number");
  });
  it("detects a boolean", () => {
    const result = fieldUtils.detectFieldFormat(false);
    expect(result).toEqual("boolean");
  });
});

describe("compileStatsForField", () => {});
