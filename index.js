const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');

// If we don't have a file.
if (process.argv.length < 3) {
    process.exit(1);
}

const calculateExp = () => {};

const mapLines = (lines) => {
    const headers = lines[0];
    // Remove headers from array.
    lines.shift();
    // Set rest of lines.
    const fileLines = lines.map((line) => {
    });
    
    const data = fileLines.map(line => {
        const columns = line.split(',');
        const h = headers.split(',');
        const ret = {};
        columns.forEach((col, index) => {
            ret[h[index]] = col;
        });
        
        return ret;
    });
    
    console.log(data);

};

const processLine = (line) => {
    // Move onto the next line.
    return line;
};

const parser = parse({
    delimiter: ','
}, (err, data) => {
    const lines = [];
    async.eachSeries(data, function(line, callback) {
        lines.push(processLine(line));
        callback();
    });
    mapLines(lines);
});

fs.createReadStream(process.argv[2]).pipe(parser);
