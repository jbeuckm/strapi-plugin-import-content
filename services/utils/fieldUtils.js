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
  detectStringFieldFormat,
  detectFieldFormat,
  compileStatsForField
};
