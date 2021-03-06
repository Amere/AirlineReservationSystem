
var con = require('../../db');
var moment = require('moment');
var flights = require('../../ReturningFlights.json');
var aircraft = require('../../aircrafts.json');

exports.seed=function(cb) {
 //con.deleteDB();
  con.db().collection('users').find({}).toArray(function(err,docs){
    if(docs.length==0){
      //console.log("HEREEE");
    con.db().createCollection("users", function(err, collection){


         //console.log("HEREEE1");
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
      con.db().createCollection("reservation", function(err, collection){


           //console.log("HEREEE1");
           console.log("Created reservationCollection");
        });
      // con.db().collection('reservation').insert(require('../../reservation'), function(err, response) {
      //   console.log("initially empty");
      // });
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



function getRoundTrip(origin,destination,departingDate,returningDate,clas,seats,db,cb) { // *********here
   var after = departingDate+84600000;
   var out =con.db().collection('flights').find( { "origin": origin , "destination" : destination,$and:[{"departureDateTime" : {$gte:departingDate}},{"departureDateTime" : {$lt:after}}],"class":clas}).toArray(function (err,fli){


  if (fli.length==0) {

  }  else {
    getOneWayTrip(destination,origin,returningDate,clas,db,function (err1,result) {
      if (err1) {
      }else {

        con.db().collection('flightsXaircrafts').findOne({flightNumber: fli[0].flightNumber}, function (err, data1) {
            if (err) {
                console.log('error in retrieving aircraft');
            } else {

              con.db().collection('flightsXaircrafts').findOne({flightNumber: result[0].flightNumber}, function (err, data2) {
                  if (err) {
                      console.log('error in retrieving aircraft');
                  } else {
                     console.log(data1.plane.seats+" ... " +seats);
                     console.log(data2.plane.seats+" ... " +seats);
                    if(data1.plane.seats>=seats && data2.plane.seats>=seats){
                        cb(null,{ "outgoingFlights" : fli,"returnFlights" : result});
                    }else{

                      cb(null,{ "outgoingFlights" : [{}],"returnFlights" : [{}]});
                    }
                  }
              });




            }
        });



      }
    });

  }
  });
  //
  //var data2=con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : returningDate}).toArray(function (err,fli)

};
function getRoundTrip2(origin,destination,departingDate,returningDate,db,cb) {
 //=con.db().collection('flights').find({"origin": destination , "destination" : origin,"departingDate" : returningDate}).toArray();
 var after = departingDate+84600000;
if(origin!='initial' && destination!='initial' && departingDate!=undefined && returningDate != undefined){
var out =con.db().collection('flights').find( { "origin": origin , "destination" : destination,$and:[{"departureDateTime" : {$gte:departingDate}},{"departureDateTime" : {$lt:after}}],"class" : "economy"}).toArray(function (err,fli){

  if (fli.length==0) {

    }  else {
    getOneWayTrip(destination,origin,returningDate,"economy",db,function (err1,result) {
      if (err1) {


      }else {
      cb(null,{ "outgoingFlights" : fli,"returnFlights" : result});
      }
    });


  }
  });
}
  //
  //var data2=con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : returningDate}).toArray(function (err,fli)

};
/**
 * ONE-WAY SEARCH From DB
 * @param origin - Flight Origin Location - Airport Code
 * @param destination - Flight Origin Location - Airport Code
 * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param clas - economy or business only
 * @returns call back function with the result
 */


 function getOneWayTrip(origin,destination,departingDate,clas,db,cb) {
var after = departingDate+84600000;
   var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,$and:[{"departureDateTime" : {$gte:departingDate}},{"departureDateTime" : {$lt:after}}],"class" : clas}).toArray(function (err,fli) {
     if (fli.length==0) {
       cb(err,fli);
     }  else {
       cb(null,fli);
     }
   });
 };
function getOneWayTrip2(origin,destination,departingDate,db,cb) {
  var after = departingDate+84600000;
  var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,$and:[{"departureDateTime" : {$gte:departingDate}},{"departureDateTime" : {$lt:after}}]}).toArray(function (err,fli) {

    if (fli.length==0) {
      cb(err,fli);
    }  else {
      cb(null,{"outgoingFlights" : fli});
    }
  });
};
function oneWayOtherCompanies(origin,destination,departingDate,clas,seats,db,cb) { // hereee *******************8
  var after = departingDate+84600000;
     var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,$and:[{"departureDateTime" : {$gte:departingDate}},{"departureDateTime" : {$lt:after}}],"class" : clas}).toArray(function (err,fli) {
       if (fli.length==0) {
         cb(err,fli);
       }  else {
         //console.log('heeeeeeeeeeeeeeeeeeeeeeere');
         con.db().collection('flightsXaircrafts').findOne({flightNumber: fli[0].flightNumber}, function (err, data) {
             if (err) {
                 console.log('error in retrieving aircraft');
             } else {

                 if(data.plane.seats>=seats){
                   cb(null,{"outgoingFlights":fli});
                 }else{

                   cb(null,{"outgoingFlights":[{}]});
                 }
             }
         });

       }
     });
};


function getMyBookings(book,cb) {
    var returned;
    var returned1;
    var r;
  //console.log("we are hereeeeeeeeeeeeeeeeeeeeeeeee12:",res.body.bookref);
   con.db().collection('reservation').find({
     bookingRefNum : book
  }).toArray(function(err, fl) {
    if (fl.length == 0) {
    } else {
      returned = fl.map(function(el) {
        return el.customer;
      });
      con.db().collection('reservation').find({
        "customer": {
          $in: returned
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
        } else {
         returned1 = fl.map(function(el) {
        return el.flight;
      });
           con.db().collection('flights').find({
        "flightNumber": {
          $in: returned1
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
        } else {
          for (i = 0; i < fli.length; i++) {
           // if (fli[i].departureDateTime > Date.now() ) {
              r = fli.map(function(el) {
                //console.log(el);
                return el;
              });
           // }
          }
        }
        cb(null, r);
      });
        }

      });

    }
  });
}


function getPastFlights(bookref,cb) {
  var returned;
  var r;


  con.db().collection('reservation').find({
     bookingRefNum : bookref
  }).toArray(function(err, fl) {
    if (fl.length == 0) {
    } else {
      returned = fl.map(function(el) {
        return el.customer;
      });
      con.db().collection('reservation').find({
        "customer": {
          $in: returned
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
        } else {
         returned1 = fl.map(function(el) {
        return el.flight;
      });
           con.db().collection('flights').find({
        "flightNumber": {
          $in: returned1
        }
      }).toArray(function(err, fli) {
        if (fli.length == 0) {
          console.log("Err2:" + err);
        } else {
          for (i = 0; i < fli.length; i++) {
            if (fli[i].departureDateTime < Date.now()) {
              r = fli.map(function(el) {
                //console.log(el);
                return el;
              });
            }
          }
        }
        console.log(r);
        cb(null, r);
      });
        }

      });

    }
  });
}
exports.getAllFlightsFromDB=getAllFlightsFromDB;
exports.getRoundTrip=getRoundTrip;
exports.getMyBookings = getMyBookings;
exports.getPastFlights = getPastFlights;
exports.getOneWayTrip=getOneWayTrip;
exports.getOneWayTrip2=getOneWayTrip2;
exports.getRoundTrip2=getRoundTrip2;
exports.oneWayOtherCompanies=oneWayOtherCompanies;
