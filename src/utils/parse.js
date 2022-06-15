const xlsxFile = require("read-excel-file/node");

async function parseData(filepath) {
  return xlsxFile(filepath).then((rows) => {
    const columnNames = rows.shift();
    return rows.map((row) => {
      const obj = {};
      row.forEach((cell, i) => {
        obj[columnNames[i]] = cell;
      });
      return obj;
    });
  });
}

module.exports = {
  parseData,
};
