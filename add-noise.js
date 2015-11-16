// Description and Usage
if (process.argv.length < 4) {
    console.log("Error: not enough parameters.")
    console.log("Add gaussian noise to a Google Data Arts globe input datafile by scaling magnitudes.")
    console.log("Usage: node add-noise.js [inputfile] [mean] [standard deviation]")
    process.exit(1)
}

var fs = require("fs");
var _ = require("underscore");
var randgen = require("randgen");

var content = fs.readFileSync(process.argv[2]);
var object = JSON.parse(content);
var triples = object[0][1];

var mean = parseFloat(process.argv[3]);
var standard_deviation = parseFloat(process.argv[4]);
var scaled = [];

// extract every third value, which is leaves the latitude and longitude but
// takes the magnitude.
var magnitudes = triples.filter(function(_,i){ return (i+1)%3 == 0});

// Gaussian scale the magnitudes
_.each(magnitudes, function(m) {
  var scaling = randgen.rnorm(mean, standard_deviation);
  scaled.push(Math.max(Math.min(m*scaling, 1.0), 0.0)); // constrain to [0.0, 1.0]
});

for (i=2;i<triples.length;i+=3) {
  triples[i] = scaled[(i-2)/3];
}

console.log(JSON.stringify(object));
