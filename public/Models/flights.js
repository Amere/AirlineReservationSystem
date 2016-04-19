
var con = require('../../db');
var moment = require('moment');
var flights = require('../../ReturningFlights.json');
var aircraft = require('../../aircrafts.json');
/**
 * Seeding the DB from JSON files
 * @returns void
 */
exports.seed=function(cb) {
  con.db().collection('users').find({},function(err,docs){
    if(docs.length==0){
    con.db().createCollection("users", function(err, collection){

         if (err) throw err;

             console.log("Created userCollection");

      });
  }
  });
  con.db().collection('aircrafts').find({}).toArray(function(err,docs){
    if(docs.length==0){

      con.db().collection('aircrafts').insert(aircraft);
      console.log('aircrafts seeded');
    } else {
      console.log('aircrafts already seeded before');
    }
  });
  con.db().collection('flightsXaircrafts').find({}).toArray(function(err, docs) {
    if (docs.length == 0) {
      for (var i = 0; i < flights.length; i++) {
        con.db().collection('flightsXaircrafts').insert({
          flightNumber: flights[i].flightNumber,
          plane: aircraft[0]
        });
      }
      console.log('aircrafts and associated flights seeded');
    } else {
      console.log('aircrafts and associated fflightsa already inserted before');
    }
  });

  con.db().collection('reservation').count(function(err, length) {
    if (err) return cb(err);
    if (length > 0) {
      console.log("insertions occured");
    } else {
      con.db().collection('reservation').insert(require('../../reservation'), function(err, response) {
        console.log("initially empty");
      });
    }

  });
  con.db().collection('ReturningFlights').count(function(err, length) {
    if (err) return cb(err);
    if (length > 0) {
      console.log("insertions occured");
    } else {
      con.db().collection('ReturningFlights').insert(require('../../ReturningFlights'), function(err, response) {
        console.log("initially empty");
      });
    }

  });
  con.db().collection('flights').find({}).toArray(function(err, docs) {
    if (docs.length == 0) {
      con.db().collection('flights').insert(require('../../flight.json'));
      cb(err, true);
    } else {
      cb(err, false);
    }
  });

  con.db().collection('flights').find({}).toArray(function (err,docs) {
    if (docs.length==0) {
    con.db().collection('flights').insert(require('../../ReturningFlights.json'));
    cb(err,true);
  }else {
    cb(err,false);
  }
});

};
/**
 * Retrieve All flights from DB
 * @returns {Array}
 */
function getAllFlightsFromDB(cb) {
  var data =con.db().collection('flights').find( ).toArray(function (err,flights) {
  if (flights.length==0) {
    cb(err,flights);
  }  else {
    cb(null,flights);
  }
  });
};


//Search Round Trip for app.get Here



function getRoundTrip(origin,destination,departingDate,returningDate,clas,db,cb) {
var ret;
 //=con.db().collection('flights').find({"origin": destination , "destination" : origin,"departingDate" : returningDate}).toArray();
getOneWayTrip(destination,origin,returningDate,clas,db,function (err1,result) {
  if (err1) {
  }else {
    ret=result;
  }
});

var out =con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departureDateTime" : departingDate.toString(),"class":clas}).toArray(function (err,fli){

  if (fli.length==0) {
    cb(err,fli);
  }  else {
    cb(null,{ "outgoingFlights" : fli,"returningFlights" : ret});
  }
  });
  //
  //var data2=con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : returningDate}).toArray(function (err,fli)

};
/**
 * ONE-WAY SEARCH From DB
 * @param origin - Flight Origin Location - Airport Code
 * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
function getOneWayTrip(origin,destination,departingDate,clas,db,cb) {
  console.log(departingDate+" "+origin+" "+destination+" "+clas);
  console.log(typeof(DepartingDate));
  var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departureDateTime" : departingDate.toString(),"class":clas}).toArray(function (err,fli) {
    if (fli.length==0) {
      cb(err,fli);
    }  else {
      cb(null,fli);
    }
  });

};
function getMyBookings(book,cb) {
    var returned;
   var r
   console.log("we are hereeeeeeeeeeeeeeeeeeeeeeeee12:",res.body.bookref);
   console.log("we are hereeeeeeeeeeeeeeeeeeeeeeeee:",book);
   con.db().collection('reservation').find({}, {
    "flight": 'SE2800'
  }).toArray(function(err, fl) {
    if (fl.length == 0) {
      console.log("Err1:" + err);
    } else {
      returned = fl.map(function(el) {
        return el.flight;
      });
      con.db().collection('ReturningFlights').find({
        "flightNumber": {
          $in: returned
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
          console.log("Err2:" + err);
        } else {
          for (i = 0; i < fli.length; i++) {
            if (fli[i].departureDateTime < Date.now()) {
              r = fli.map(function(el) {
                return el;
              });

            }



          }
        }
        cb(null, r);
      });
    }
  });
  }

function getPastFlights(cb) {
  var returned;
  var r;


  con.db().collection('reservation').find({}, {
    "flight": 'SE2800'
  }).toArray(function(err, fl) {
    if (fl.length == 0) {
      console.log("Err1:" + err);
    } else {
      returned = fl.map(function(el) {
        return el.flight;
      });
      con.db().collection('ReturningFlights').find({
        "flightNumber": {
          $in: returned
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
          console.log("Err2:" + err);
        } else {
          for (i = 0; i < fli.length; i++) {
            if (fli[i].departureDateTime < Date.now()) {
              r = fli.map(function(el) {
                return el;
              });

            }



          }
        }
        cb(null, r);
      });
    }
  });
}

exports.getAllFlightsFromDB=getAllFlightsFromDB;
exports.getRoundTrip=getRoundTrip;
exports.getMyBookings = getMyBookings;
exports.getPastFlights = getPastFlights;
exports.getOneWayTrip=getOneWayTrip;

