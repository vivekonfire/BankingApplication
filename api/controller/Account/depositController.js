const DAO = require("../../dataAccess/accountDAO");

module.exports = async (req,res) => {
  try {
    const account = req.params.accNumber;
    const amount = req.body.amount;

    const data = await DAO.deposit(account,amount);

    res.status(201).json({created:data,message:"Deposit Complete"});
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}