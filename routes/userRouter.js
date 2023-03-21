const express = require('express');
const router = express.Router()
const userController = require("../controllers/userController")
const userModel = require('../model/userModel')
const { body } = require('express-validator');

router.post('/create',
    body('email')
        .not()
        .isEmpty().withMessage('Must be fill the Email Field')
        .isEmail().withMessage('Must be Email type')
        .custom(async (value) => {
            let user = await userModel.findOne({
                email: value
            })
            if (user) {
                return Promise.reject('Email Already in Use');
            }
        }).withMessage('Email Already in Use'),


    body('username')
        .not().isEmpty().withMessage('Username is Required'),

    body('password')
        .not()
        .isEmpty().withMessage('Must be fill the Email Field')
        .isLength({ min: 5 }).withMessage('Must Contain 5 Character Password'),


    body('phone')
        .not().isEmpty(),
    userController.createUser)

router.get('/all', userController.allUser)

router.get('/get/:email', userController.getUser)

router.post('/register', userController.registerUser)

router.post('/login',
    body('email')
        .not()
        .isEmpty().withMessage('Must be fill the Email Field')
        .isEmail().withMessage('Must be Email type')
        .custom(async (value) => {
            let user = await userModel.findOne({
                email: value
            })
            if (!user) {
                return Promise.reject('Email is not exist Register First');
            }
        }).withMessage('Email is not exist Register First'),

    body('password')
        .not()
        .isEmpty().withMessage('Must be fill the Email Field')
        .isLength({ min: 5 }).withMessage('Must Contain 5 Character Password'),

    userController.loginUser)

router.post('/update/:id', userController.updateUser)

router.get('/delete/:email', userController.deleteUser)

module.exports = router;