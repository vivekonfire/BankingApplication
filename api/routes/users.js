const express = require('express');
const router = express.Router();
const {userValidation} = require('../middleware/validationMiddleware');
const createUserController = require("../controller/User/createUserController");
const getUserController = require("../controller/User/getUserController");

router.post('/',userValidation, createUserController);
router.get('/',getUserController);


module.exports = router;