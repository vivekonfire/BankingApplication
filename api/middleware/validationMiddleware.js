const User = require("../models/User");
const Account = require("../models/Account");

exports.userValidation = async (req,res,next) => {
  try {
    const user = req.body;
    await User.validate(user);
    
    next();
  } catch (e) {
    res.status(400).json({message:e})
  }
} 

exports.accountValidation = async (req,res,next) => {
  try {
    const account = req.body;
    await Account.validate(account);
    
    next();
  } catch (e) {
    res.status(400).json({message:e})
  }
} 