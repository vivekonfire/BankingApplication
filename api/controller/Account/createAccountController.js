const DAO = require("../../dataAccess/accountDAO");
const bcrypt = require("../../config/bcrypt");
const jwtConfig = require("../../config/jwtConfig");

module.exports = async (req,res) => {
  try {
    const account = req.body;

    let {password} = account;

    account.password = await bcrypt.generate(password)

    const data = await DAO.createAccount(account);

    const jwt = await jwtConfig.createToken(account.accountNumber);

    res.status(201).json({created:data,message:"Account Created",account,token:jwt});
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}