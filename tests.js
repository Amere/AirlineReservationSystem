var assert = require('chai').assert;
var expect = require('chai').expect;
var index = require('./app.js');
var request = require('supertest');
var db = require('./db.js');
var flights = require('./public/Models/flights.js');

function doesContain(arr,i){
  for(var idx=0;idx<arr.length;idx++){
    if(arr[idx]===i)return true;
  }
  return false;
}

before(function(done) {
     db.connect(function(db) {
       done();
     });
});

describe('Deleting all collections from the DB',function(){
  it('should clear all collections in the db',function(done){
    db.deleteDB();
    if (db.db().listCollections().toArray().length==0) {
      assert(1,1);
    }else{
      assert(1,0);
    }
    done();
  });
});

describe('Seeding info to the DB', function() {
    before(db.deleteDB);
    it('should populate the db if db is empty returning true', function(done) {
        flights.seed(function(error, seeded){
            assert.equal(seeded,true);
            done();
        });
      });

      it('should have populated the db with 2 collections', function(done) { //2 collections for now to be updated later
        db.db().listCollections().toArray().then(function (collections) {
            if(collections.length>=2){
              assert.equal(0,0);
            }else{
              assert.equal(0.1);
            }
            done();
          });
      });


    it('collection of flights should be seeded', function(done) {
      db.db().collection('flights').find({}).toArray(function(err,docs){
      if(docs.length!=0){
        assert.equal(1,1);
      }else{
        assert.equal(1,0);
      }
    });
    done();
    });


    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        flights.seed(function(error, seeded){
            assert.equal(false,seeded);
            done();
       });
    });
});


describe('testing Flight model functions',function(){

  it('should return a one way flight with the destination specified',function(done){
    flights.getOneWayTrip('CAI','CAI',1230,db,function(err,res){
      if(err){
        assert.equal(false,true);
      }else{
        if(res.duration!=undefined)
        asssert.equal(false,false);
        else {
          assert.equal(false,true);
        }
      }
    });
    done();
  });

  it('should return a one way flight with the destination specified',function(done){
    flights.getRoundTrip('CAI','CAI',1230,12,db,function(err,res){
      if(err){
        assert.equal(false,true);
      }else{
        if(res.duration!=undefined)
        asssert.equal(false,false);
        else {
          assert.equal(false,true);
        }
      }
    });
    done();
  });

  it('should return an array of all the flights on the db',function(done){
    flights.getAllFlightsFromDB(function(err,res){
      if(err){
        assert.equal(false,true);
      }else{
        asssert.equal(false,false);
      }
    });
    done();
  });

})







describe('testing all API', function() {
   request = request(index);


      it('/api/flights/search/:origin/:destination/:departingDate/:returningDate should return JSON object from the DB with the specified data for a Round Trip flight', function(done) {
        request.get("/api/flights/search/CAI/CAI/1230/12").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.have.property("departureDate");
          expect(res.body).to.have.property("arrivalDate");
          expect(res.body).to.have.property("departureCity");
          expect(res.body).to.have.property("destinationCity");
          expect(res.body).to.have.property("duration");
          expect(res.body).to.have.property("origin");
          expect(res.body).to.have.property("destination");
          expect(res.body).to.have.property("departingDate");
          expect(res.body).to.have.property("returningDate");
          expect(res.body).to.have.property("class");
         done();
        });
      });

      it('/api/flights/search/:origin/:destination/:departingDate/:class should return JSON object from the DB with the specified data for the a One Way flight', function(done) {
        request.get("/api/flights/search/CAI/CAI/1230/economy").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.have.property("departureDate");
          expect(res.body).to.have.property("arrivalDate");
          expect(res.body).to.have.property("departureCity");
          expect(res.body).to.have.property("destinationCity");
          expect(res.body).to.have.property("duration");
          expect(res.body).to.have.property("origin");
          expect(res.body).to.have.property("destination");
          expect(res.body).to.have.property("departingDate");
          expect(res.body).to.have.property("returningDate");
          expect(res.body).to.have.property("class");
         done();
        });
      });



   it('/api/data/codes should return a JSON array of all airports with functions', function(done) {
     request.get("/api/data/codes").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
        });
     });



   it('/api/data/offers should return an array of JSON object of offers', function(done) {
     request.get("/api/data/offers").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/news should return an array of JSON object of news', function(done) {
     request.get("/api/data/news").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/nations should return an array of JSON object of all nations', function(done) {
     request.get("/api/data/nations").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/flight should return an array of JSON object of the flights', function(done) {
     request.get("/api/data/flight").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/slides should return an array of JSON object of the slides', function(done) {
     request.get("/api/data/slides").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });




   it('/api/data/bookings should return an array of JSON object of all bookings', function(done) {
     request.get("/api/data/bookings").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/pastFlights should return an array of JSON object of past flights', function(done) {
     request.get("/api/data/pastFlights").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



   it('/api/data/aircraft/:name should return the aircraft with the specified name', function(done) {
     request.get("/api/data/aircraft/AirbusA330-300").set("Accept", "application/json").expect(200).end(function(err,res){
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("economySeatsCount");
        expect(res.body).to.have.property("firstSeatsCount");
        done();
     });
   });



   it('/api/data/conf should return an array of JSON object with the confirmation details', function(done) {
     request.get("/api/data/conf").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });




   it('/api/all should return an array of JSON object of all the flights on the DB', function(done) {
     request.get("/api/all").set("Accept", "application/json").expect(200).end(function(err,res){
          expect(res.body).to.be.a('array');
          done();
     });
   });



});
