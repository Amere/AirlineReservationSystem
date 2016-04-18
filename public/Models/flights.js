var con = require('../../db');
var moment = require('moment');
/**
 * Seeding the DB from JSON files
 * @returns void
 */
exports.seed=function(cb) {
  con.db().collection('aircrafts').find({}).toArray(function(err,docs){
    if(docs.length==0){
      con.db().collection('aircrafts').insert(require('../../aircrafts.json'));
      console.log('aircrafts seeded');
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

exports.getAllFlightsFromDB=getAllFlightsFromDB;
exports.getRoundTrip=getRoundTrip;
exports.getOneWayTrip=getOneWayTrip;
