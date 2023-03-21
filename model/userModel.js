const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: "string",
    },
    email: {
        required: true,
        type: "string",
    },
    phone: {
        required: true,
        type: "string",
    },
    password: {
        type: "string",
        required: "true"
    },
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;