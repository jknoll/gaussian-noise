var _ = require("underscore");
var randgen = require("randgen");

function scale_magnitude(pairs)
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

function scale_list(triples, pairs) {
  var scaled = scale_magnitude(pairs);
  for (var i=2;i<triples.length;i+=3) {
    triples[i] = scaled[(i-2)/3];
  }
}

function scale(triples, mean, standard_deviation) {
  // Extract every third value, which leaves the latitude and longitude but
  // takes the magnitude.
  var magnitudes = triples.filter(function(_,i){ return (i+1)%3 == 0});
  var scaling_factors = randgen.rvnorm(magnitudes.length, mean, standard_deviation);
  var pairs = _.zip(magnitudes, scaling_factors);
  return scale_list(triples, pairs);
}

exports.scale_magnitude = scale_magnitude;
exports.scale_list = scale_list;
exports.scale = scale;
