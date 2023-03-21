const { validationResult } = require('express-validator');
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs');

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

    let hashPassword = await bcrypt.hash(password, 8);

    let newUser = await new userModel({
        username,
        email,
        phone,
        password: hashPassword
    }).save();
    res.status(201).json(
        { newUser, hashPassword }
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

// Login User
async function loginUser(req, res, next) {
    let { email, password } = req.body;
    let user = await userModel.findOne({
        email: email
    });
    
    if (user) {
        console.log(user);
        let checkPass = await bcrypt.compare(password, user.password);
        if (checkPass) {
            return res.json(user).status(200);
        } else {
            return res.json("Password Can't Match").status(422);
        }
    } else {
        return res.json("User not Found").status(404);
    }

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
    registerUser,
    loginUser
}