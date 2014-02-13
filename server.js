(function() {
  var express = require('express');
  var app  = express();
  var port = process.env.PORT || 2828;
  process.env.PWD = process.cwd()
  app.configure(function() {
    app.set('views', process.env.PWD + '/views');
    app.set('view engine', 'jade');
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(process.env.PWD + '/public'));
    return app.use(app.router);
  });
  app.get('/', function(req, res) {
    return res.render('index.jade', {
      locals: {
        title: 'HTML5 Strategy Game'
      }
    });
  });
  app.listen(port);
}).call(this);
