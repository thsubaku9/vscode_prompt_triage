var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.DBURL,{ useNewUrlParser: true, useUnifiedTopology: true })

var conn = mongoose.connection
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

//schema portion
var UserModelSchema = new Schema({
  name: String,
  uid: Schema.Types.ObjectId
});
var userModel = mongoose.model('userModel', UserModelSchema );
module.exports = {
    dbConnection : conn,
    userModel: userModel
}