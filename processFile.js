/* 
 * Data takes the format of an array of objects with the 
 * column headers as the prop accessors.
 */
module.exports = function(data) {
    // Your code goes here.
    console.log(calculateExp(data));
}


// Calculate expenses minus any gains we might have had.
const calculateExp = (data) => {
    return data.reduce((tot, line) => {
        return tot += line['Credit'] ? parseFloat(line['Credit']) : -parseFloat(line['Debit']);
    }, 0).toFixed(2);
};