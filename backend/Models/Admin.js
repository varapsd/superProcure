var mongoose = require('mongoose');
var AdminLoginSchema = mongoose.Schema({
    userName : String,
    password : String,
    notifications : [Number],
    newNotificaitons : [Number]
});

// Export adminLoginModel model
module.exports ={
    Admin:mongoose.model('admin', AdminLoginSchema)
}