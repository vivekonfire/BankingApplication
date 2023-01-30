const DAO = require("../../dataAccess/accountDAO");

module.exports = async (req,res) => {
  try {
    const accNumber = req.params.accNumber;

    const data = await DAO.getAcount(accNumber);
    res.status(200).json(data);
    
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}