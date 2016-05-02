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

var flights = require('../public/Models/flights.js');

/**
 * Our DB connection
 */
var db = require('../db.js');
/**
 * moment package timing manipulation
 */
var moment = require('moment');
/**
 * Stripe package setup with key
 */
var stripeApiKeyTesting = process.env.STRIPSECRET;
var stripe = require('stripe')("sk_test_ZGN5swvfDxoH9S2zF8U6ghff");
const async = require('async');
const request = require('request');

/**
 * Seeding our database
 */
db.connect(function (err, db) {
    flights.seed(function (err, seeded) {

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
 router.all('*', function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', '*');
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
/* POST method to update seat and make it reserved */
router.post('/api/updateSeat', function (req, res) {
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
        db.db().collection('flightsXaircrafts').update({flightNumber: fn}, {$set: {plane: cc}}, function (err, data) {
        });
    });


});


/* GET past flights given that booking reference */
router.get('/api/data/pastFlights/:ref', function (req, res) {
    var book = req.params.ref;
    flights.getPastFlights(book, function (err, json) {
        if (!err) {
            res.send(json);
        }
    });
});
/* GET Bookings given that booking reference */
router.get('/api/data/bookings/:ref', function (req, res) {
    var book = req.params.ref;
    flights.getMyBookings(book, function (err, json) {
        if (!err) {
            res.send(json);
        }
    });
});

/* GET Aircraft of a certain flight number */
router.get('/api/data/aircraft/:flightNum', function (req, res) {
    db.db().collection('flightsXaircrafts').findOne({flightNumber: req.params.flightNum}, function (err, data) {
        if (err) {
            console.log('error in retrieving aircraft');
        } else {
            res.json(data);
        }
    });

});
/* POST method to add new user to users collection*/
router.post('/api/adduser', function (req, res) {
    var user = req.body.user;
    db.db().collection('users').insert(user, function (err, docs) {
        res.json(docs);
    });
});
/* POST method to add new reservation to reservation collection*/
router.post('/api/addreservation', function (req, res) {
    var reserv = req.body.reserv;
    db.db().collection('reservation').insert(reserv, function (err, docs) {
    });
});
/* POST method to update a seat to be reserved*/
router.post('/api/updateSeat', function (req, res) {
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
        });
    });
});
/*Helper method to request a certain api in another company and return the result*/
function httpGet(url, callback) {
    const options = {
        url: url,
        json: false
    };
    request(options,
        function (err, res, body) {
           // console.log(err);
            try {
                    var x = JSON.parse(body);
                    if (body != undefined && x.length != 0 && err==null) {
                       console.log(x.outgoingFlights[0].Airline);
                        callback(err, x);
                    }

            }catch (e){
              // console.log(e);
            }
        }
    );
}

/* Helper method to generate APIs URLs that will be requested to retrieve certain flights
 * For One way trip
 * */
function generateUrlsOne(origin, destination, x, clas) {
    var ips = require('../testIp.json');
    var generated = [];
    for (var i = 0; i < ips.length; i++) {
        var element = ips[i];
        var url = element.ip + 'api/flights/search/' + origin + '/' + destination + '/' + x + '/' + clas + '/' + '1' + '?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
        generated.push(url);
    }
    return generated;
};
/* Helper method to generate APIs URLs that will be requested to retrieve certain flights
 * For Round trip flights
 * */
function generateUrlsRound(origin, destination, x, y, clas) {
    var ips = require('../testIp.json');
    var generated = [];
    for (var i = 0; i < ips.length; i++) {
        var element = ips[i];
        var url = element.ip + 'api/flights/search/' + origin + '/' + destination + '/' + x + '/' + y + '/' + clas + '/' + '1' + '?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
        generated.push(url);
    }
    return generated;
};
/* API to retrieve a certain flight from other companies  */
router.get('/api/companies/flights/search/:origin/:destination/:departingDate/:class1', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    var clas = req.params.class1;
    const urls = generateUrlsOne(origin, destination, x, clas);
    async.map(urls, httpGet, function (err, resultOneMap) {
        console.log(resultOneMap);
        console.log(err);
        manipulateOne(resultOneMap, function (finalValue) {
            console.log(finalValue);
            res.json(finalValue);
        });
        console.log("Here1");
    });
});
/* Helper method to generate a valid JSON file that will be passed to the view for One
 * way trip
 * */
function manipulateOne(arrayReturn, cb) {
    var out = '';
    var returnString = '';
    var flag = false;
   // console.log("manipulaaaaaaaaaaaaaaaaaate");
    for (var i = 0; i < arrayReturn.length; i++) {

            var item = arrayReturn[i];
            var tempOut = JSON.stringify(item.outgoingFlights[0]);
            //console.log(tempOut);
            if (flag == false) {
                if (tempOut != undefined) {
                   // console.log("Iffffffffffffffff");
                    out += tempOut;
                    flag = true;
                }
            } else {
                out += "," + tempOut;
            }

    }
    var template = '{"outgoingFlights":[' + out + ']}';
    //console.log(template);
    cb(JSON.parse(template));
};
/* API to retrieve a certain flight from other companies  */
router.get('/api/companies/flights/search/:origin/:destination/:departingDate/:returningDate/:class1', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var returningDate = req.params.returningDate;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    var y = moment(returningDate).add(19, 'hours').toDate().getTime();
    var clas = req.params.class1;
    const urls = generateUrlsRound(origin, destination, x, y, clas);
    async.map(urls, httpGet, function (err, resultOneMap) {
        console.log(resultOneMap);
        manipulate(resultOneMap, function (finalValue) {
            res.json(finalValue);
        });
    });
    console.log("Here2");
});

/* Helper method to generate a valid JSON file that will be passed to the view  */
function manipulate(arrayReturn, cb) {
    var out = '';
    var returnString = '';
    //var returnValue = [];
    for(var i = 0 ;i<arrayReturn.length;i++){
        var item = arrayReturn[i];
        //console.log(template);

        // console.log(obj);
        var tempOut = JSON.stringify(item.outgoingFlights[0]);
        var tempRet = JSON.stringify(item.returnFlights[0]);
        if(i==arrayReturn.length-1) {
            if (tempOut != undefined && tempRet!=undefined){
                out +=tempOut;
                returnString +=tempRet;
            }
        }else{
            if (tempOut != undefined && tempRet!=undefined){
                out+=tempOut+',';
                returnString+=tempRet+',';
            }
        }
        //console.log(tempOut);


    }
    var template = '{"outgoingFlights":['+out+'],'+'"returnFlights":['+returnString+']}';
    console.log(template.length);
    console.log(JSON.parse(template));


    // console.log(JSON.parse(template));
    cb(JSON.parse(template));
};
router.post('/booking', function (req, res) {

    // retrieve the token
    var stripeToken = req.body.paymentToken;
    var flightCost  = req.body.cost;

    stripe.charges.create({
        amount: flightCost*100,
        currency: "usd",
        source: stripeToken,
        description: "test"
    }, function (err, data) {
        if (err) {
            res.send({refNum: null, errorMessage: err});
        }
        else {//TO DO
            res.send({refNum: "sghcvhstripeTokenjdceudgie89", errorMessage: null});
            // payment successful
            // create reservation in database
            // get booking reference number and send it back to the user

        }

    });

});

router.get('/stripe/Getpubkey',function(req,res){
  console.log('before airline');
  var airline = req.headers['airline'];
  console.log(airline);
  var ip ="";
  var ips = require('../testIp.json');
  for(var i = 0 ;i<ips.length;i++){
      if(ips[i].company.toLowerCase().includes(airline.toLowerCase())){
          ip = ips[i].ip;
      }
  }
  console.log('in router **');
  request.get(ip+'stripe/pubkey?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE',
  function (error,response,body){
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send({key : body, errorMessage:null});

    }else{
      console.log('in else ****************');
      res.send({key : null, errorMessage:error});
    }
  });


});

router.get('/stripe/pubkey',function(req,res){
  res.send('pk_test_w9rj63MfOpwqhpHG3ekIOxoV');
});

router.post('/bookingOther',function(req,res){
    var stripeToken = req.body.paymentToken;
    var flightCost  = req.body.cost;
    var flightIdOut = req.body.outgoingFlightId;
    var flightIdRet = req.body.returnFlightId;
    var info = req.body.passengerDetails;
    var Class = req.body.class;
    var airline = req.body.airline;
    var ip ="";
    var ips = require('../testIp.json');
    for(var i = 0 ;i<ips.length;i++){
        if(ips[i].company.toLowerCase().includes(airline.toLowerCase())){
            ip = ips[i].ip;
        }
    }
    //console.log(ip+'booking?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE');
    request.post(ip+'booking?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE',{
        "paymentToken" : stripeToken,
        "class": Class,
        "cost": flightCost,
        "outgoingFlightId": flightIdOut,
        "returnFlightId": flightIdRet,
        "passengerDetails":info
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }else{
            //console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror "+airline);
            res.send({refNum: null, errorMessage: {
                "message":"error while trying to connect with "+airline+" , Please try again later"
            }});
        }
    })
});

/**
 * middelware to add guarantee that the request is coming from our server not from
 * an unauthorised person
 */

router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

    var jwtSecret = process.env.JWTSECRET;

    jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) {
            res.send('unauthorised access');
        } else {
            next();
        }
    });

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

router.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = (++req.params.departingDate) + 68400000;
    var returningDate = (++req.params.returningDate) + 68400000;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    var y = moment(returningDate).add(19, 'hours').toDate().getTime();
    var clas = req.params.class;
    flights.getOneWayTrip(origin, destination, departingDate, clas, db, function (err, result) {
        res.json(result);
    });

});
router.get('/api/flights/searchSecure/:origin/:destination/:departingDate/:returningDate', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var returningDate = req.params.returningDate;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    var y = moment(returningDate).add(19, 'hours').toDate().getTime();
    flights.getRoundTrip2(origin, destination, x, y, db, function (err, result) {
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
router.get('/api/flights/search/:origin/:destination/:departingDate/:class1/:seats', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = (++req.params.departingDate) + 68400000;
    var clas = req.params.class1;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    flights.oneWayOtherCompanies(origin, destination, departingDate, clas, db, function (err, result) {
        res.json(result);
    });

});

router.get('/api/flights/search/:origin/:destination/:departingDate', function (req, res) {
    var origin = req.params.origin;
    var destination = req.params.destination;
    var departingDate = req.params.departingDate;
    var x = moment(departingDate).add(19, 'hours').toDate().getTime();
    flights.getOneWayTrip2(origin, destination, x, db, function (err, result) {
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


/**
 * End point to retrieve all airport codes
 **/
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
