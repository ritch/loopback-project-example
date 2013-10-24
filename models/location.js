/**
 * Location Model
 */

var project = require('../project');
var Location = project.models.Location;
var maps = project.dataSources.maps;

/**
 * Find nearby locations.
 */

Location.nearby = function(here, page, max, fn) {
  if (typeof page === 'function') {
    fn = page;
    page = 0;
    max = 0;
  }

  if (typeof max === 'function') {
    fn = max;
    max = 0;
  }

  var limit = 10;
  page = page || 0;
  max = Number(max || 100000);

  Location.find({
    // find locations near the provided GeoPoint
    where: {geo: {near: here, maxDistance: max}},
    // paging
    skip: limit * page,
    limit: limit
  }, fn);
};

/**
 * Build the geo data when saving using the google maps api.
 */

Location.beforeSave = function(next, loc) {
  // geocode the address
  if (!loc.geo) {
    maps.geocode(loc.street, loc.city, loc.zipcode, function(err, result, res) {
      if (result && result[0]) {
        loc.geo = result[0].lng + ',' + result[0].lat;
        next();
      } else {
        next(new Error('could not find location'));
      }
    });
  } else {
    next();
  }
};
