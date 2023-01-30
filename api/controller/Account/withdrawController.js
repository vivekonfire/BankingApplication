const DAO = require("../../dataAccess/accountDAO");

module.exports = async (req,res) => {
  try {
    const account = req.params.accNumber;
    const amount = req.body.amount;

    const data = await DAO.withdraw(account,amount);

    res.status(201).json({created:data,message:"Withdraw Complete"});
  } catch (e) {
    console.log(e);
    if(e.message === "Error: Insufficient Balance")
      return res.status(400).json({message:e.message})
    res.status(500).send("Server Error")
  }
}