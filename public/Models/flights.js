var con = require('../db');

exports.seed=function(cb) {
  con.db().collection('flights').find({}).toArray(function (err,docs) {
    if (docs.length==0) {
    con.db().collection('flights').insert(require('../flight.json'));
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
function getRoundTrip() {

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
