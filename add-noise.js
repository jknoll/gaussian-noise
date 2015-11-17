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
var content = '[["1990",[6,159,0.001,30,99,0.002,45,-109,0.000,42,115,0.007,4,-54,0.000,-16,-67,0.014,21,-103,0.006,-20,-64,0.004,-40,-69,0.001,32,64,0.001,28,67,0.006,8,22,0.000,-15,133,0.000,-16,20,0.000,55,42,0.006]]]';
var object = JSON.parse(content);
var triples = object[0][1];

var mean = parseFloat(process.argv[3]);
var standard_deviation = parseFloat(process.argv[4]);

function scale(pairs)
{
  var scaled = [];

  // Gaussian scale the magnitudes
  _.each(pairs, function(pair) {
    var magnitude = pair[0];
    var scaling_factor = pair[1];
    scaled.push(Math.max(Math.min(magnitude * scaling_factor, 1.0), 0.0)); // constrain to [0.0, 1.0]
  });
  return scaled;
}

function scale_triples(triples, mean, standard_deviation) {
  // Extract every third value, which leaves the latitude and longitude but
  // takes the magnitude.
  var magnitudes = triples.filter(function(_,i){ return (i+1)%3 == 0});
  var scaling_factors = randgen.rvnorm(magnitudes.length, mean, standard_deviation);
  var pairs = _.zip(magnitudes, scaling_factors);

  var scaled = scale(pairs);
  for (var i=2;i<triples.length;i+=3) {
    triples[i] = scaled[(i-2)/3];
  }
}

triples = scale_triples(triples, mean, standard_deviation);
console.log(object);
