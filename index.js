const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const moment = require('moment');


// All for custom prop names for files that might be different than the one I am processing.
const expenseFieldName = process.env.debName ? process.env.debName : 'Debit';
const paymentFieldName = process.env.credName ? process.env.credName : 'Credit';

// If we don't have a file.
if (process.argv.length < 3) {
    process.exit(1);
}

// Calculate expenses minus any gains we might have had.
const calculateExp = (data) => {
    return data.reduce((tot, line) => {
        return tot += line[expenseFieldName] ? -parseFloat(line[expenseFieldName]) : parseFloat(line[paymentFieldName]);
    }, 0).toFixed(2);
};

// Format the data for processing.
const mapLines = (lines) => {
    const headers = lines[0];
    // Remove headers from array.
    lines.shift();
    // Set rest of lines.    
    const data = lines.map(line => {
        const h = headers;
        const ret = {};
        line.forEach((col, index) => {
            ret[h[index]] = col;
        });
        return ret;
    });

    return data;
};

// Do any additional necessary processing.
const processLine = (line) => {
    // Move onto the next line.
    return line;
};

// Setup the parser.
const parser = parse({
    delimiter: ','
}, (err, data) => {
    const lines = [];
    async.eachSeries(data, function(line, callback) {
        lines.push(processLine(line));
        callback();
    });
    const lineItems = mapLines(lines);
    const balance = calculateExp(lineItems);
    console.log('Balance:', balance)
});

fs.createReadStream(process.argv[2]).pipe(parser);
