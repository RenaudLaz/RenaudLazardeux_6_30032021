const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schema User (email-mdp)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);