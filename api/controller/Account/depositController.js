const DAO = require("../../dataAccess/accountDAO");
const {transactionsChannel} = require("../../config/rabbitMQ");

module.exports = async (req,res) => {
  try {
    const account = req.params.accNumber;
    const amount = req.body.amount;

    const data = await DAO.deposit(account,amount);

    const channel = await transactionsChannel();
    await channel.channel.publish(channel.transactionExchange, '', Buffer.from(JSON.stringify({message:`An Amount of ${amount} is credited to you account:${account} and total amount is ${data.balance}`,user:data.user})))

    res.status(201).json({data:data,message:"Deposit Complete"});
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}