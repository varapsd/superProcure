var mongoose = require('mongoose');
var branchSchema = mongoose.Schema({
    bId: Number,
    institutionName : String,
    branchName : String,
    address : String,
    city : String,
    contactNumbers : [ String ],
    branchInchanrge : String,
    Pincodes : [ Number ]
});

// Export adminLoginModel model
module.exports ={
    Branch:mongoose.model('branch', branchSchema)
}