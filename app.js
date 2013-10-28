var loopback = require('loopback');
var app = module.exports = loopback();

// configure the app
// read more: <link to docs>
app.boot();

// only start the server if this module
// is the main module...
if(require.main === module) {
  app.listen();
}
