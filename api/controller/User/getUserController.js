const DAO = require("../../dataAccess/userDao");

module.exports = async (req,res) => {
  try {
    const data = await DAO.getAllUsers();
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}