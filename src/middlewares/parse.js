const xlsxFile = require('read-excel-file/node');

const filepath = "uploads/pets.xlsx"

async function parseData() {
    return xlsxFile(filepath)
    .then((rows) => {
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

// Immediately invoked function expression to call parseData function
(async () => {
    const res = await parseData();
})()

module.exports = {
    parseData
}