var loopback = require('loopback');
var app = module.exports = loopback();

// express compatible middleware
app.use(loopback.favicon());
app.use(loopback.logger('dev'));
app.use(loopback.bodyParser());
app.use(loopback.methodOverride());
app.use(app.router);
app.use(loopback.static(path.join(__dirname, 'public')));

// configure the app
// read more: <link to docs>
app.boot();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// only start the server if this module
// is the main module...
if(require.main === module) {
  app.listen();
}
