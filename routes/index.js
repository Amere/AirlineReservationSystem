/**
 * express package
 */
var express = require('express');
/**
 * requiring express router
 */
var router = express.Router();
/**
 * Jwt package for json web token
 */
var jwt = require('jsonwebtoken');

var flights=require('../public/Models/flights.js');

/**
 * Our DB connection
 */
var db = require('../db.js');
/**
 * moment package timing manipulation
 */
var moment = require('moment');

const async = require('async');
const request = require('request');

/**
 * Seeding our database
 */
db.connect(function (err, db) {
    flights.seed(function (err, seeded) {
        if (err) throw err;
        if (!seeded) {
            console.log('data already inserted before');
        } else {
            console.log('data  inserted ');

        }
    })
});
/**
 * middelware to add Access-Control-Allow-Origin header to res
 */
router.all('*',function(req,res,next){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers','x-access-token');
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('landing');
});
/* GET google maps API */
router.get('/google7a607af0cf3cce8e.html', function (req, res, next) {
    res.render('google7a607af0cf3cce8e.html');
});

router.post('/api/updateSeat',function(req,res){
     var fn=req.body.fn;
      var sn= req.body.sn;
      console.log(fn);
      console.log(sn);
      db.db().collection('flightsXaircrafts').findOne({flightNumber:fn},function(err,data){
            var cc= data.plane;
            for(var i=0;i<cc.economeySeats.length;i++){
                  for(var j=0;j<cc.economeySeats[i].length;j++){
                        if(cc.economeySeats[i][j].seatCode==sn){
                              cc.economeySeats[i][j].reserved="true";
                            }
                      }
                }
            db.db().collection('flightsXaircrafts').update({flightNumber:fn},{$set:{plane:cc}},function(err,data){
                  if(err) throw err;
                });
          });


            });

/* GET airports codes */
;
router.get('/api/data/flight', function (req, res) {
    var dummy = require('../flight.json');
    res.json(dummy);
});

router.get('/api/data/pastFlights/:ref',function(req,res){
  var book=req.params.ref;
  flights.getPastFlights(book,function(err,json){
    if(!err){
      res.send(json);
    }
  });
});
router.get('/api/data/bookings/:ref',function(req,res){
  var book=req.params.ref;
  console.log(book+'yayayayaay');
  flights.getMyBookings(book,function(err,json){
    if (err) throw err;
    if(!err){
      res.send(json);
    }
});
  });


router.get('/api/data/aircraft/:flightNum',function(req,res){
  db.db().collection('flightsXaircrafts').findOne({flightNumber:req.params.flightNum},function(err,data){
    if(err){
      console.log('error in retrieving aircraft');
    }else{
      res.json(data);
    }
  });

});
router.post('/api/adduser',function(req,res){
  var user= req.body.user;
  db.db().collection('users').insert(user,function(err,docs){
    if (err) throw err;
    res.json(docs);
  });
});
router.post('/api/addreservation',function(req,res){
  var reserv= req.body.reserv;
  db.db().collection('reservation').insert(reserv,function(err,docs){
    if (err) throw err;
  });
});
router.post('/api/updateSeat',function(req,res) {
    var fn = req.body.fn;
    var sn = req.body.sn;
    db.db().collection('flightsXaircrafts').findOne({flightNumber: fn}, function (err, data) {
        var cc = data.plane;
        for (var i = 0; i < cc.economeySeats.length; i++) {
            for (var j = 0; j < cc.economeySeats[i].length; j++) {
                if (cc.economeySeats[i][j].seatCode == sn) {
                    cc.economeySeats[i][j].reserved = "true";
                }
            }
        }
        for (var i = 0; i < cc.businessSeats.length; i++) {
            for (var j = 0; j < cc.businessSeats[i].length; j++) {
                if (cc.businessSeats[i][j].seatCode == sn) {
                    cc.businessSeats[i][j].reserved = "true";
                }
            }
        }
        for (var i = 0; i < cc.firstClassSeats.length; i++) {
            for (var j = 0; j < cc.firstClassSeats[i].length; j++) {
                if (cc.firstClassSeats[i][j].seatCode == sn) {
                    cc.firstClassSeats[i][j].reserved = "true";
                }
            }
        }
        for (var i = 0; i < cc.premiumEconomySeats.length; i++) {
            for (var j = 0; j < cc.premiumEconomySeats[i].length; j++) {
                if (cc.premiumEconomySeats[i][j].seatCode == sn) {
                    cc.premiumEconomySeats[i][j].reserved = "true";
                }
            }
        }
        db.db().collection('flightsXaircrafts').update({flightNumber: fn}, {$set: {plane: cc}}, function (err, data) {
            if (err) throw err;
        });
    });
});
function httpGet(url, callback) {
    const options = {
        url :  url,
        json : true
    };
    request(options,
        function(err, res, body) {
            callback(err, body);
        }
    );
}


function generateUrlsOne(origin,destination,x,clas){
    var ips = require('../testIp.json');
    var generated = [];
    for(var i = 0 ;i<ips.length;i++){
        var element = ips[i];
        var url = element.ip + 'api/flights/search/' + origin + '/' + destination + '/' + x + '/' + clas + '?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
        //console.log(url);
        generated.push(url);
    }
    return generated;
};
function generateUrlsRound(origin,destination,x,y,clas){
    var ips = require('../testIp.json');
    var generated = [];
    for(var i = 0 ;i<ips.length;i++){
        var element = ips[i];
        var url = element.ip + 'api/flights/search/' + origin + '/' + destination + '/' + x +'/' +y+'/' + clas + '?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
       // console.log(url);
        generated.push(url);
    }
    return generated;
};

router.get('/api/companies/flights/search/:origin/:destination/:departingDate/:class1', function(req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    //var returningDate = req.params.returningDate;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
   // var y = moment(returningDate).add(19, 'hours').toDate().getTime();
    var clas = req.params.class1;
    //console.log(generateUrlsRound(origin,destination,x,y,clas));
    const urls = generateUrlsOne(origin, destination, x, clas);

    async.map(urls, httpGet, function (err, resultOneMap) {
        // var temp = resultOneMap;
        //  var obj = JSON.parse(returnFinal);
        //console.log(resultOneMap.outgoingFlights);


        // console.log(JSON.stringify(returnFinal));
        // returnFinal+=JSON.stringify(resultOneMap);
        //console.log(JSON.stringify(returnFinal));
        manipulateOne(resultOneMap, function (finalValue) {
            res.json(finalValue);
        });


//// console.log(departingDate);
//
//
////  var x=moment(departingDate).toDate().getTime();
//    flights.oneWayOtherCompanies1(origin,destination,x,clas,db,function(err,result) {
//        res.json(result);
//    });

    });
});
function manipulateOne(arrayReturn,cb){
    var out = '';
    var returnString = '';
    //var returnValue = [];
    for(var i = 0 ;i<arrayReturn.length;i++){
        var item = arrayReturn[i];
        //console.log(template);

        // console.log(obj);
        var tempOut = JSON.stringify(item.outgoingFlights[0]);
        //var tempRet = JSON.stringify(item.returnFlights[0]);
        if(i==arrayReturn.length-1) {
            if(tempOut!=undefined){
                out +=tempOut;
            }

           // returnString +=tempRet;
        }else{
            if(tempOut!=undefined) {
                out += tempOut + ',';
            }
           // returnString+=tempRet+',';
        }
        //console.log(tempOut);


    }
    var template = '{"outgoingFlights":['+out+']}';
    console.log(template.length);
    console.log(JSON.parse(template));


    // console.log(JSON.parse(template));
    cb(JSON.parse(template));
};
router.get('/api/companies/flights/search/:origin/:destination/:departingDate/:returningDate/:class1', function(req, res) {
    var origin =req.params.origin;
    var destination=req.params.destination;
    var departingDate=req.params.departingDate;
    var returningDate=req.params.returningDate;
    var x=moment(departingDate).add(19, 'hours').toDate().getTime();
    var y=moment(returningDate).add(19, 'hours').toDate().getTime();
    var clas = req.params.class1;
    //console.log(generateUrlsRound(origin,destination,x,y,clas));
    const urls= generateUrlsRound(origin,destination,x,y,clas);

    async.map(urls, httpGet, function (err, resultOneMap){
       // var temp = resultOneMap;
      //  var obj = JSON.parse(returnFinal);
        //console.log(resultOneMap.outgoingFlights);



        // console.log(JSON.stringify(returnFinal));
       // returnFinal+=JSON.stringify(resultOneMap);
        //console.log(JSON.stringify(returnFinal));
        manipulate(resultOneMap,function(finalValue){
            res.json(finalValue);
        });

    });



//// console.log(departingDate);
//
//
////  var x=moment(departingDate).toDate().getTime();
//    flights.oneWayOtherCompanies1(origin,destination,x,clas,db,function(err,result) {
//        res.json(result);
//    });

});



/**
 * middelware to add guarantee that the request is coming from our server not from
 * an unauthorised person
 */

function manipulate(arrayReturn,cb){
    var out = '';
    var returnString = '';
    //var returnValue = [];
    for(var i = 0 ;i<arrayReturn.length;i++){
        var item = arrayReturn[i];
        //console.log(template);

       // console.log(obj);

            var tempOut = JSON.stringify(item.outgoingFlights[0]);
            var tempRet = JSON.stringify(item.returnFlights[0]);
            if (i == arrayReturn.length - 1) {
                if (tempOut != undefined && tempRet!=undefined) {
                    out += tempOut;
                    returnString += tempRet;
                }
            } else {
                if (tempOut != undefined && tempRet!=undefined) {
                    out += tempOut + ',';
                    returnString += tempRet + ',';
                }

            //console.log(tempOut);
        }
    }
   console.log(out);
    var template = '{"outgoingFlights":['+out+'],'+'"returnFlights":['+returnString+']}';
   console.log(template.length);
    //console.log(JSON.parse(template));


   // console.log(JSON.parse(template));
    cb(JSON.parse(template));
};

 router.use(function(req, res, next) {

     // check header or url parameters or post parameters for token
     var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

     var jwtSecret = process.env.JWTSECRET;
     //console.log(jwtSecret);
     // Get JWT contents:
     jwt.verify(token,jwtSecret, function(err, decoded) {
         if(err){
             //console.log(err);
             res.send('unauthorised access');
         }else {
             //console.log('verified');
             next();
         }
     });

 });

router.get('/api/data/conf', function (req, res) {
    var dummy = require('../confirm.json');
    res.json(dummy);
});
/**
 * End Point to retrieve a list of ips of te other companies
 */
router.get('/api/data/ips', function (req, res) {
    var ips = require('../testIp.json');
    res.json(ips);
});


/**
 * ROUND-TRIP SEARCH REST ENDPOINT
 * @param origin - Flight Origin Location - Airport Code
 * @param destination - Flight Destination Location - Airport Code
 * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */

router.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
  var origin =req.params.origin;
  var destination=req.params.destination;
  var departingDate=(++req.params.departingDate)+68400000;
  var returningDate=(++req.params.returningDate)+68400000;
    console.log(departingDate);
  var x=moment(departingDate).add(19, 'hours').toDate().getTime();
  var y=moment(returningDate).add(19, 'hours').toDate().getTime();
  var clas=req.params.class;
  //var clas=req.params.class;
  flights.getOneWayTrip(origin,destination,departingDate,clas,db,function(err,result) {
     res.json(result);
   });

});
router.get('/api/flights/searchSecure/:origin/:destination/:departingDate/:returningDate', function(req, res) {
  var origin =req.params.origin;
  var destination=req.params.destination;
  var departingDate=req.params.departingDate;
  var returningDate=req.params.returningDate;
  var x=moment(departingDate).add(19, 'hours').toDate().getTime();
  var y=moment(returningDate).add(19, 'hours').toDate().getTime();
  //var clas=req.params.class;
  flights.getRoundTrip2(origin,destination,x,y,db,function(err,result) {
     res.json(result);
   });

});


/**
 * ONE-WAY SEARCH REST ENDPOINT
 * @param origin - Flight Origin Location - Airport Code
 * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
router.get('/api/flights/search/:origin/:destination/:departingDate/:class1', function(req, res) {
  var origin =req.params.origin;
  var destination=req.params.destination;
  var departingDate=(++req.params.departingDate)+68400000;
  var clas=req.params.class1;
  var x=moment(departingDate).add(19, 'hours').toDate().getTime();
// console.log(departingDate);


//  var x=moment(departingDate).toDate().getTime();
  flights.oneWayOtherCompanies(origin,destination,departingDate,clas,db,function(err,result) {
    res.json(result);
  });

});





router.get('/api/flights/search/:origin/:destination/:departingDate', function(req, res) {
  var origin =req.params.origin;
  var destination=req.params.destination;
  var departingDate=req.params.departingDate;
  var x=moment(departingDate).add(19, 'hours').toDate().getTime();

// console.log(departingDate);
   console.log(moment(1464563999952).format('YYYY-MM-DD hh:mm A')+"fffffffffffffffffff");
    console.log(moment('2016-04-29 07:00 PM', 'YYYY-MM-DD hh:mm A')+"************************");
    console.log(1460498400000-1460412000000);
  // console.log(x);
  //  console.log(moment(1460480400000).format('YYYY-MM-DD hh:mm A')+" "+"here");

//  var x=moment(departingDate).toDate().getTime();
  flights.getOneWayTrip2(origin,destination,x,db,function(err,result) {
    res.json(result);
  });

});
/**
 * All Flights ENDPOINT
 * @returns {Array}
 */
router.get('/api/all', function (req, res) {
    flights.getAllFlightsFromDB(function (err, result) {
        res.json(result);
    });
});




router.get('/api/data/codes', function (req, res) {
    var codes = require('../airports.json');
    res.json(codes);
});
/* GET offers */
router.get('/api/data/offers', function (req, res) {
    var offers = require('../offers.json');
    res.json(offers);
});
/* GET news */
router.get('/api/data/news', function (req, res) {
    var news = require('../news.json');
    res.json(news);
});
/* GET slides */
router.get('/api/data/slides', function (req, res) {
    var slides = require('../slides.json');
    res.json(slides);
});

/**
 * Nationalities REST ENDPOINT
 * @returns {Array}
 */
router.get('/api/data/nations', function (req, res) {
    var nat = require('../nationalities.json');
    res.json(nat);
});


module.exports = router;
