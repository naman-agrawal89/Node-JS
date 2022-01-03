
var express = require('express');
var path = require('path');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname + '/html'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/html'));

// controller router file ...

app.use('/', require("./controller/restapi/router"));

// creating server

var server = app.listen(process.env.PORT || 6001, function() { 

      console.log('Listening locally on port %d', server.address().port);

      var adr = 'http://localhost:'+server.address().port;
      console.log('Browser Addr', adr);
}); 