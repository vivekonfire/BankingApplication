const express = require('express');
const router = express.Router();
const {accountValidation} = require('../middleware/validationMiddleware');
const createAccountController = require("../controller/Account/createAccountController");
const getAccountsController = require("../controller/Account/getAccountsController");
const withdrawController = require("../controller/Account/withdrawController");
const depositController = require("../controller/Account/depositController");
const loginController = require("../controller/Account/loginController");
const getAccountController = require('../controller/Account/getAccountsController');
const {validateToken} = require("../config/jwtConfig");

router.post('/',accountValidation, createAccountController);
router.get('/',validateToken, getAccountsController);
router.get('/:accNumber',validateToken, getAccountController);
router.put('/withdraw/:accNumber',validateToken, withdrawController);
router.put('/deposit/:accNumber',validateToken, depositController);
router.post('login', loginController);


module.exports = router;