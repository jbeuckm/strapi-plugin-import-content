"use strict";
var ss = require("simple-statistics");

const detectStringFieldFormat = data => {
  if (new Date(data).toString() !== "Invalid Date") return "date";

  return "string";
};

const detectFieldFormat = data => {
  switch (typeof data) {
    case "number":
      return "number";

    case "boolean":
      return "boolean";

    case "string":
      return detectStringFieldFormat(data);
  }
};

const compileStatsForField = (shape, fieldData) => {
  shape = {
    lengths: [],
    formats: [],
    ...shape
  };

  shape.lengths.push(fieldData.length);
  shape.formats.push(detectFieldFormat(fieldData));

  return shape;
};

module.exports = {
  analyze: async items => {
    const fieldTotals = items.reduce((acc, item) => {
      Object.keys(item).forEach(key => {
        acc[key] = compileStatsForField(acc[key], item[key]);
      });
      return acc;
    }, {});

    const fieldStats = [];
    Object.keys(fieldTotals).forEach(key => {
      const totals = fieldTotals[key];

      const fieldStat = { fieldName: key, count: totals.formats.length };

      const formats = new Set(totals.formats);
      if (formats.size === 1) {
        fieldStat.format = totals.formats[0];
      }

      fieldStat.minLength = ss.min(totals.lengths);
      fieldStat.maxLength = ss.max(totals.lengths);
      fieldStat.meanLength = ss.mean(totals.lengths).toFixed(2);

      fieldStats.push(fieldStat);
    });

    return { itemCount: items.length, fieldStats };
  }
};
