var express = require('express');
var router = express.Router();
var jwt     = require('jsonwebtoken');
var flights=require('../public/Models/flights.js');
var db=require('../db.js');
var moment = require('moment');
db.connect (function(err,db){
  flights.seed(function(err,seeded){
    if(err) throw err;
    if(!seeded){
      console.log('data already inserted before');
    }else{
      console.log('data  inserted ');

    }
  })
});

// Export environment vars first thing

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
router.get('/api/data/aircraft/:name',function(req,res){
  db.db().collection('aircrafts').findOne({name:req.params.name},function(err,data){
    if(err){
      console.log('error in retrieving aircraft');
    }else{
    res.json(data);
  }
  });
});
router.get('/api/data/conf',function(req,res){
  var dummy =  require('../confirm.json');
  res.json( dummy );
});
 router.use(function(req, res, next) {

   // check header or url parameters or post parameters for token
   var token = req.body.token || req.query.token || req.headers['token'];

   var jwtSecret = process.env.JWTSECRET;
   console.log(jwtSecret);
   // Get JWT contents:
   jwt.verify(token,jwtSecret, function(err, decoded) {
     if(err){
       console.log(err);
     }else {
      console.log('verified');
       next();
     }
   });

 });

router.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate', function(req, res) {
  var origin =req.params.origin;
  var destination=req.params.destination;
  var departingDate=req.params.departingDate;
  var returningDate=req.params.returningDate;
  var x=moment(departingDate).toDate().getTime();
  var y=moment(returningDate).toDate().getTime();
  //var clas=req.params.class;
  flights.getRoundTrip(origin,destination,x,y,db,function(err,result) {
     res.json(result);
   });
});
router.get('/api/all',function (req,res) {
  flights.getAllFlightsFromDB(function (err,result) {
    res.json(result);
  });
});

module.exports = router;
