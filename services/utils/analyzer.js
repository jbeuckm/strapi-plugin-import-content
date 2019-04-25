"use strict";
var ss = require("simple-statistics");
const fieldUtils = require("./fieldUtils");

const analyze = items => {
  const fieldTotals = items.reduce((acc, item) => {
    Object.keys(item).forEach(key => {
      acc[key] = fieldUtils.compileStatsForField(acc[key], item[key]);
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
};

module.exports = { analyze };
