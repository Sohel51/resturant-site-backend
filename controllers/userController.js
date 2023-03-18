const { validationResult } = require('express-validator');

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

// Create
function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
        name, email, phone, password
    } = req.body;
    users.push({
        name, email, phone, password
    })
    res.json(
        users
    )
}

// Read
function allUser(req, res, next) {
    res.json(users)
}

// Get
function getUser(req, res) {
    res.json('Get User')
}

// Update
function updateUser(req, res) {
    res.json('Update User')
}

// Delete
function deleteUser(req, res) {
    res.json('Delete User')
}

module.exports = {
    createUser,
    allUser,
    getUser,
    updateUser,
    deleteUser
}