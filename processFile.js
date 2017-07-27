const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const moment = require('moment');

/* 
 * Data takes the format of an array of objects with the 
 * column headers as the prop accessors.
 */
module.exports = function(file, cb) {

    // Setup the parser.
    const parser = parse({
        delimiter: ','
    }, (err, data) => {
        const lines = [];
        async.eachSeries(data, function(line, callback) {
            lines.push(processLine(line));
            callback();
        });
        const items = mapLines(lines);
        // Your code goes here.
        cb(items);
    });

    fs.createReadStream(file).pipe(parser);
}

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