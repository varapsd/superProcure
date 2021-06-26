var mongoose = require('mongoose');
var notificationSchema = mongoose.Schema({
    notificaitonId : Number,
    name : String,
    phone : String,
    pin : Number,
    email : String,
});

// Export adminLoginModel model
module.exports ={
    Notification:mongoose.model('notification', notificationSchema)
}