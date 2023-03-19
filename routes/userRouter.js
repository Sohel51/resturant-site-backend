const express = require('express');
const router = express.Router()
const userController = require("../controllers/userController")
const { body } = require('express-validator');

router.post('/create',
    body('email')
    .not()
    .isEmpty().withMessage('Must be fill the Email Field')
    .isEmail() .withMessage('Must be Email type'),
    body('password')
    .not()
    .isEmpty().withMessage('Must be fill the Email Field')
    .isLength({ min: 5 }).withMessage('Must Contain 5 Character Password'),
    body('phone')
    .not().isEmpty(),
    userController.createUser)

router.get('/all', userController.allUser)

router.get('/get/:id', userController.getUser)

router.post('/register', userController.registerUser)

router.post('/update/:id', userController.updateUser)

router.get('/delete/:id/:name', userController.deleteUser)

module.exports = router;