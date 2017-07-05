const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const Q = require('q');

// If we don't have a file.
if (process.argv.length < 1) {
    process.exit(1);
}

const processLine = (line) => {
    console.dir(line);
    return Q();
};

const parser = parse({
    delimiter: ','
}, function(err, data) {
    async.eachSeries(data, function(line, callback) {
        processLine(line).then(function() {
            // when processing finishes invoke the callback to move to the next one
            callback();
        });
    })
});

fs.createReadStream(process.argv[2]).pipe(parser);