"use strict";

const { analyze } = require("./analyzer");

describe("analyze", () => {
  it("generates an analysis from an item array", () => {
    const analysis = analyze([]);

    expect(analysis.itemCount).toEqual(0);
    expect(analysis.fieldStats).toEqual([]);
  });
});
