const { validationResult } = require('express-validator');
const userModel = require('../model/userModel')

let users = [
    {
        name: 'Abul',
        email: 'abul@gmail.com',
        phone: '04348340',
        password: "12345",
    },
    {
        name: 'Kaium',
        email: 'kaium@gmail.com',
        phone: '04348340',
        password: "123456",
    }
]

// Create User Using HTTP
async function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        username, email, phone, password
    } = req.body;

    let newUser = await new userModel({
        username, email, phone, password
    }).save();
    res.status(201).json(
        newUser
    )
}


// Register User Using Frontend
function registerUser(req, res, next) {
    const {
        name, email, phone, password
    } = req.body;

    users.push({
        name, email, phone, password
    })

    return res.status(201).json(
        users
    )
}

// Read User Data
async function allUser(req, res, next) {
    let dbUsers = await userModel.find().exec();
    res.json(dbUsers).status(200);
}

// Get Users Data
function getUser(req, res, next) {
    email = req.params.email;

    let result = users.find(i => i.email === email);

    return res.json(result).status(200);
}

// Update User
function updateUser(req, res, next) {
    res.json('Update User')
}

// Delete User
function deleteUser(req, res, next) {
    email = req.params.email;
    let index = users.findIndex(i => i.email === email)
    users.splice(index, 1)
    return res.json(users).status(200);
}

module.exports = {
    createUser,
    allUser,
    getUser,
    updateUser,
    deleteUser,
    registerUser
}