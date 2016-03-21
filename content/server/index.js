var express = require('express');
var app = express();


app.use(express.static('./'));

app.get('/get', function(req, res){
}