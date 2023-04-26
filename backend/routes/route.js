const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const authenticate = require('../middleware/authenticate');

const {
    isRequestValidated,
    validateSignUpRequest,
    validateSignIpRequest,
} = require("../validators");

router.get('/', (req, res) => {
    res.send("Hello, Greetings and Welcome to superM services !!")
})

//user routes
router.post('/login', userController.signIn);
router.post('/register', isRequestValidated, userController.register);

module.exports = router;