var mongoose = require('mongoose');
 
var descSchema = new mongoose.Schema({
    desc: String,
});
 
 
module.exports = new mongoose.model('Desc', descSchema);