var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

dotenv.load({
  path: './.env'
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*************rutas****************/
var indexCtrl = require('./controllers/index');

app.get('/', indexCtrl.index);

app.use("*", function(req, res) {
  res.send("ko");
});

/***********servidor***************/
var server = require('http').Server(app);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || process.env.CUSTOM_IP;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || process.env.CUSTOM_PORT;

server.listen(server_port,server_ip_address, function() { 
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});