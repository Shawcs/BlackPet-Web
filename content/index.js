var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
var swig        = require('swig')
var path        = require("path");

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://dev:dev@ds023478.mlab.com:23478/webitem');
var Item     = require('./server/model/webitem.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// more routes for our API will happen here

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// on routes that end in /items
// ----------------------------------------------------
router.route('/items')
    // create a item (accessed at POST http://localhost:8080/api/items)
    .post(function(req, res) {
        
        var item = new Item();      // create a new instance of the Item model
        item.name = req.query.name;  // set the item name (comes from the request)
        item.imgurl = req.query.imgurl;
        item.price = req.query.price;
        item.description = req.query.description;

        // save the item and check for errors
        item.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Item created!' });
        });
    })

     // get all the bears (accessed at GET http://localhost:8080/api/items)
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            console.log("Items found");
            swig.renderFile('./server/templates/item.html', {items: items},function(err, output){
                if(err){
                    throw err;
                }
                res.status(200).send({html : output, item: items});
                res.end();    
                console.log("Items send");
            });
        });
    });

router.route('/shopitem')
    .get(function(req, res) {
        console.log(req.query.item);
        swig.renderFile('./public/html/shopitem.html', JSON.parse(req.query.item),function(err, output){
            if(err){
                throw err;
            }
            res.status(200).send(output);
            res.end();
            console.log("shopitem html generated");
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(__dirname +'/public'));
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

