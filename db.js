/**
 * mongodb default adaptor
 */
var mongo = require('mongodb');
/**
 * our DB object that will be initialized after establishing connection
 **/
var DB = null;
/**
 * db URL that our db in
 */
var dbURL = 'mongodb://localhost:27017/temp';

/**
 * connects to the DB that is in dbUrl initialized above
 */
exports.connect = function(cb) {
  mongo.MongoClient.connect(dbURL,function(err, db) {
  if (err) {
    cb(err,db);
  }
  DB=db;
  cb(err,db);
});
}

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};
/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.deleteDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};
