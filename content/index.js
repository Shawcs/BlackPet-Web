
var leboncoin = require('./index.html');
var swig  = require('swig');
var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/process_get', function(req, res){
	try {
		swig.renderFile('./template.html', resultats,function(err, output){
			if(err){
				throw err;
			}
			res.end(output);	
		});
	
   }
   catch(ex){
   		console.log(ex.toString());
   	   	res.end("error");
   }
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
