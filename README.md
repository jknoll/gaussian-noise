WebGL Globe Gaussian Noise
==============

[![Build Status](https://travis-ci.org/jknoll/gaussian-noise.svg?branch=master)](https://travis-ci.org/jknoll/gaussian-noise)

The Google Data Arts team's [WebGL Globe](https://github.com/dataarts/webgl-globe) uses a JSON data format defined like this:

```javascript
var data = [
    [
    'seriesA', [ latitude, longitude, magnitude, latitude, longitude, magnitude, ... ]
    ],
    [
    'seriesB', [ latitude, longitude, magnitude, latitude, longitude, magnitude, ... ]
    ]
];
```

This script takes an input JSON datafile as a command line argument and adds noise to the input datafile by leaving the latitude and longitude untouched but scaling each magnitude by a normally distributed random amount with mean and standard deviation also passed on the command line. Each such scaled magnitude is then limited to [0.0, 1.0] if it would otherwise fall outside these bounds.

The resulting JSON is written to stdout.

```
Add gaussian noise to a Google Data Arts globe input datafile by scaling magnitudes.
Usage: node noise.js [inputfile] [mean] [standard deviation]")
Example: node noise.js population909500.json 0.5 0.25
```
