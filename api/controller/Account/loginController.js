const bcrypt = require('bcryptjs');
const DAO = require("../../dataAccess/accountDAO");
const jwtConfig = require("../../config/jwtConfig");

module.exports = async (req,res) => {
  try {
    const {accountNumber,password} = req.body;

    const account = await DAO.getAcount(accountNumber);
    if(!account)
      return res.status(404).json({message:"No Account with this account number"});

    const comparePasswords = await bcrypt.compare(password,account.password);
    if(!comparePasswords)
      return res.status(403).json({message:"Invalid Credentials"});

    const jwt = jwtConfig.createToken(accountNumber);
    res.status(200).json({token:jwt})
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
}