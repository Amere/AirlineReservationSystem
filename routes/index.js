var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
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

module.exports = router;
