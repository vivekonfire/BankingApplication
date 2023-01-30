const DAO = require("../../dataAccess/accountDAO");
const {transactionsChannel} = require("../../config/rabbitMQ");

module.exports = async (req,res) => {
  try {
    const account = req.params.accNumber;
    const amount = req.body.amount;

    const data = await DAO.withdraw(account,amount);

    const channel = await transactionsChannel();
    await channel.channel.publish(channel.transactionExchange, '', Buffer.from(JSON.stringify(`An Amount of ${amount} is credited to you account:${account} and total amount is ${data.balance}`)))

    res.status(201).json({data:data,message:"Withdraw Complete"});
  } catch (e) {
    console.log(e);
    if(e.message === "Error: Insufficient Balance")
      return res.status(400).json({message:e.message})
    res.status(500).send("Server Error")
  }
}