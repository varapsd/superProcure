var mongoose = require('mongoose');
var branchLoginSchema = mongoose.Schema({
    bId: Number,
    userName : String,
    password : String,
    notifications : [Number],
    newNotificaitons : [Number]
});

// Export adminLoginModel model
module.exports ={
    BranchLogin:mongoose.model('branchLogin', branchLoginSchema)
}