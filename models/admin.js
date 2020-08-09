var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


var adminSchema = new mongoose.Schema({
    password: String,
    email: { type: String, unique: true, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    mobile: Number,
    typeof: { type: String, default: 'admin' }
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });



module.exports = mongoose.model("Admin", adminSchema);

