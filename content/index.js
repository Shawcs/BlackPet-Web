var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

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

// on routes that end in /items
// ----------------------------------------------------
router.route('/items')

    // create a item (accessed at POST http://localhost:8080/api/items)
    .post(function(req, res) {
        
        var item = new Item();      // create a new instance of the Item model
        item.name = req.query.name;  // set the item name (comes from the request)
        item.imgurl = req.query.imgurl;
        item.prix = req.query.prix;
        item.description = req.query.description;
        console.log(req.query.imgurl);
        console.log(req.query);
        console.log(item);
        // save the item and check for errors
        item.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Item created!' });
        });
        
    })

     // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    });



router.get('/', function(req, res) {
    res.json({ message: 'Yeaaaaaaaah! welcome to my badass api' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

>>>>>>> 6e8aac0982a7686f992938597a35ec3bfc2a9e21
