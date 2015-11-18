var test = require('tape');
var addnoise = require('../add-noise.js');

test('scale_magnitude test', function(t) {
  t.plan(1);
  var pairs = [[1.0, 0.25], [0.5, 0.1], [0.25, 2.0]]
  t.deepEqual(addnoise.scale_magnitude(pairs), [0.25, 0.05, 0.5]);
});
