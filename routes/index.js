var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

router.get('/google7a607af0cf3cce8e.html', function(req, res, next) {
  res.render('google7a607af0cf3cce8e.html');
});
router.get('/api/data/codes',function(req,res){
  var codes =  require('../airports.json');
  res.json( codes );
});

router.get('/api/data/offers',function(req,res){
  var offers =  require('../offers.json');
  res.json( offers );
});
router.get('/api/data/news',function(req,res){
  var news =  require('../news.json');
  res.json( news );
});
router.get('/api/data/flight',function(req,res){
  var dummy =  require('../flight.json');
  res.json( dummy );
});
router.get('/api/data/slides',function(req,res){
  var slides =  require('../slides.json');
  res.json( slides );
});
router.get('/api/data/bookings',function(req,res){
  var bookings =  require('../bookings.json');
  res.json( bookings );
});
router.get('/api/data/pastFlights',function(req,res){
  var pastFlights =  require('../pastFlights.json');
  res.json( pastFlights );
});
router.get('/api/data/bookings',function(req,res){
  var pastFlights =  require('../bookings.json');
  res.json( pastFlights );
});

router.get('/api/data/nations',function(req,res){
  var nat =  require('../nationalities.json');
  res.json( nat );
});
router.get('/api/data/conf',function(req,res){
  var dummy =  require('../confirm.json');
  res.json( dummy );
});


module.exports = router;
