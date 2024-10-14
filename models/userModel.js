const mongoose = require('mongoose');

// Create a schema for the User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;