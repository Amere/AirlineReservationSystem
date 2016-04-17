var con = require('../../db');
var flights = require('../../ReturningFlights.json');
var aircraft = require('../../aircrafts.json');
/**
 * Seeding the DB from JSON files
 * @returns void
 */
exports.seed=function(cb) {
  con.db().collection('aircrafts').find({}).toArray(function(err,docs){
    if(docs.length==0){
      con.db().collection('aircrafts').insert(aircraft);
      console.log('aircrafts seeded');
    }else{
      console.log('aircrafts already seeded before');
    }
  });
  con.db().collection('flightsXaircrafts').find({}).toArray(function(err,docs){
    if(docs.length==0){
      for(var i=0;i<flights.length;i++){
        con.db().collection('flightsXaircrafts').insert({flightNumber:flights[i].flightNumber,plane:aircraft[0]});
      }
      console.log('aircrafts and associated flights seeded');
    }else{
      console.log('aircrafts and associated fflightsa already inserted before');
    }
  });
  con.db().collection('flights').find({}).toArray(function (err,docs) {
    if (docs.length==0) {
    con.db().collection('flights').insert(require('../../flight.json'));
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

/**
 * ROUND-TRIP SEARCH From DB
 * @param origin - Flight Origin Location - Airport Code
 * @param destination - Flight Destination Location - Airport Code
 * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
function getRoundTrip(origin,destination,departingDate,returningDate,db,cb) {
  var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : departingDate,"returningDate" : returningDate}).toArray(function (err,fli) {
  if (fli.length==0) {
    cb(err,fli);
  }  else {
    cb(null,fli);
  }
  });

};
/**
 * ONE-WAY SEARCH From DB
 * @param origin - Flight Origin Location - Airport Code
 * @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
 * @param class - economy or business only
 * @returns {Array}
 */
function getOneWayTrip(origin,destination,departingDate,db,cb) {
  var data =con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : departingDate}).toArray(function (err,fli) {
    if (fli.length==0) {
      cb(err,fli);
    }  else {
      cb(null,fli);
    }
  });

};
exports.getAllFlightsFromDB=getAllFlightsFromDB;
exports.getRoundTrip=getRoundTrip;
exports.getOneWayTrip=getOneWayTrip;
