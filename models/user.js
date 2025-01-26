const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },

    otp: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', 
    errorMessages: {
        MissingEmailError: 'An email is required',
        MissingPoneError: 'Phone number is required',
        MissingPasswordError: 'A password is required',
        IncorrectEmailError: 'The email is incorrect',
        IncorrectPasswordError: 'The password is incorrect'
    }
});

module.exports = mongoose.model('User', userSchema);
