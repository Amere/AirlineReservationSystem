var con = require('../../db');

exports.seed=function(cb) {
  con.db().collection('flights').find({}).toArray(function (err,docs) {
    if (docs.length==0) {
    con.db().collection('flights').insert(require('../../flight.json'));
    cb(err,true);
  }else {
    cb(err,false);
  }
});
};

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


function getRoundTrip(origin,destination,departingDate,returningDate,db,cb) {
 var ret=con.db().collection('flights').find({"origin": destination , "destination" : origin,"departingDate" : returningDate}).toArray();
 console.log(ret+"hiiiiiiiiiiiiiiiiiiiiiiii");
var out =con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : departingDate}).toArray(function (err,fli){
  if (fli.length==0) {
    cb(err,fli);
  }  else {
    cb(null,{'outgoingFlights' : fli,"returningFlights" : ret});
  }
  });
  //
  //var data2=con.db().collection('flights').find( { "origin": origin , "destination" : destination,"departingDate" : returningDate}).toArray(function (err,fli)

};


//Search Round Trip for app.post Here
function postRoundTrip() {


};




//Search One way for app.get Here
function getOneWay() {

};




//Search One way for app.post Here
function PostOneWay() {



};

exports.getAllFlightsFromDB=getAllFlightsFromDB;
exports.getRoundTrip=getRoundTrip;
exports.postRoundTrip=postRoundTrip;
exports.getOneWay=getOneWay;
exports.PostOneWay=PostOneWay;
