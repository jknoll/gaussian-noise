var addnoise = require("./add-noise.js");
var fs = require("fs");

// Description and Usage
if (process.argv.length < 4) {
    console.log("Error: not enough parameters.")
    console.log("Add gaussian noise to a Google Data Arts globe input datafile by scaling magnitudes.")
    console.log("Usage: node add-noise.js [inputfile] [mean] [standard deviation]")
    process.exit(1)
}



var content = fs.readFileSync(process.argv[2]);
var object = JSON.parse(content);
var triples = object[0][1];

var mean = parseFloat(process.argv[3]);
var standard_deviation = parseFloat(process.argv[4]);

triples = addnoise.scale(triples, mean, standard_deviation);
console.log(JSON.stringify(object));
