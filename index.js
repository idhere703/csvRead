const processFile = require('./processFile');

// If we don't have a file.
if (process.argv.length < 3) {
    process.exit(1);
}

// Your code goes in the callback.
processFile(process.argv[2], (data) => {
    console.log('Data', data);
});
