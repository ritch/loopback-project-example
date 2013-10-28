var loopback = require('loopback');
var app = module.exports = loopback();

// configure the app
// read more: <link to docs>
app.bootstrap();

// only start the server if this module
// is the main module...
if(module === process.mainModule) {
  app.listen();
}
